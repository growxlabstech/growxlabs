import * as THREE from 'three'

export class CollisionSystem {
  private collidables: THREE.Mesh[] = []
  private raycaster = new THREE.Raycaster()

  setCollidables(meshes: THREE.Mesh[]): void {
    this.collidables = meshes
  }

  checkGroundBelow(
    position: THREE.Vector3
  ): THREE.Intersection | null {
    this.raycaster.set(
      position,
      new THREE.Vector3(0, -1, 0)
    )
    this.raycaster.far = 100
    const hits = this.raycaster
      .intersectObjects(this.collidables, false)
    return hits.length > 0 ? hits[0] : null
  }

  checkWallAhead(
    position: THREE.Vector3,
    direction: THREE.Vector3,
    distance: number
  ): THREE.Intersection | null {
    this.raycaster.set(position, direction)
    this.raycaster.far = distance
    const hits = this.raycaster
      .intersectObjects(this.collidables, false)
    return hits.length > 0 ? hits[0] : null
  }
}
