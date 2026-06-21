import * as THREE from 'three'

export class WallRunner {
  private isWallRunning: boolean = false
  private wallNormal: THREE.Vector3 = 
    new THREE.Vector3()
  private wallRunTimer: number = 0
  private readonly MAX_WALL_RUN = 2.5
  private raycaster = new THREE.Raycaster()
  private collidables: THREE.Mesh[] = []

  setCollidables(meshes: THREE.Mesh[]): void {
    this.collidables = meshes
  }

  update(
    delta: number,
    position: THREE.Vector3,
    velocity: THREE.Vector3,
    moveDir: THREE.Vector3
  ): boolean {
    if (this.isWallRunning) {
      this.wallRunTimer -= delta
      if (this.wallRunTimer <= 0) {
        this.stopWallRun()
        return false
      }
      return true
    }

    // Detect wall
    if (moveDir.length() > 0.5) {
      const angles = [-0.3, 0, 0.3, -0.6, 0.6]
      for (const angle of angles) {
        const dir = moveDir.clone()
        dir.applyAxisAngle(
          new THREE.Vector3(0,1,0), angle)
        this.raycaster.set(position, dir)
        const hits = this.raycaster
          .intersectObjects(
            this.collidables, false)
        if (hits.length > 0 && 
            hits[0].distance < 1.8) {
          this.startWallRun(
            hits[0].face!.normal, velocity)
          return true
        }
      }
    }
    return false
  }

  private startWallRun(
    normal: THREE.Vector3,
    velocity: THREE.Vector3
  ): void {
    this.isWallRunning = true
    this.wallNormal = normal.clone()
    this.wallRunTimer = this.MAX_WALL_RUN
    velocity.y = 3
  }

  stopWallRun(): void {
    this.isWallRunning = false
    this.wallRunTimer = 0
  }

  getIsWallRunning(): boolean {
    return this.isWallRunning
  }

  getWallNormal(): THREE.Vector3 {
    return this.wallNormal
  }

  getWallJumpVelocity(): THREE.Vector3 {
    return this.wallNormal.clone()
      .multiplyScalar(15)
      .add(new THREE.Vector3(0, 20, 0))
  }
}
