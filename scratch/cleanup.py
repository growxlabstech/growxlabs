import shutil
import os

paths_to_remove = [
    'app/[locale]/(realestate)/page.tsx',
    'app/[locale]/(restaurant)/page.tsx',
    'app/[locale]/(hotel)/page.tsx',
    'app/[locale]/(realestate)/contact',
    'app/[locale]/(realestate)/properties',
    'app/[locale]/(realestate)/property',
    'app/[locale]/(restaurant)/menu',
    'app/[locale]/(restaurant)/cart',
    'app/[locale]/(restaurant)/checkout',
    'app/[locale]/(restaurant)/order-success',
    'app/[locale]/(restaurant)/track-order',
    'app/[locale]/(hotel)/rooms',
    'app/[locale]/(hotel)/room',
    'app/[locale]/(hotel)/booking',
    'app/[locale]/(hotel)/confirmation',
    'app/[locale]/page.tsx'
]

for path in paths_to_remove:
    try:
        if os.path.isfile(path):
            os.remove(path)
            print(f"Removed file: {path}")
        elif os.path.isdir(path):
            shutil.rmtree(path)
            print(f"Removed dir: {path}")
    except Exception as e:
        print(f"Error removing {path}: {e}")
