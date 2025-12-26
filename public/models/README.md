# 3D Models Directory

## Required File

Place your 3D movie camera model here:
- **Filename:** `movie-camera.glb`
- **Format:** GLB (GL Transmission Format Binary)
- **Path:** `public/models/movie-camera.glb`

## Where to Get 3D Models

### Free Resources:
1. **Sketchfab** - https://sketchfab.com/search?q=movie+camera&type=models
   - Filter by "Downloadable" and "Free"
   - Look for models with GLB/GLTF format

2. **TurboSquid Free Section** - https://www.turbosquid.com/Search/3D-Models/free/movie-camera
   - Download as FBX/OBJ and convert to GLB

3. **Poly Haven** - https://polyhaven.com/
   - High-quality free 3D assets

### Converting to GLB:
If you have an FBX, OBJ, or other format:
1. Use **Blender** (free): Import → Export as GLB
2. Use **gltf.report** online converter
3. Use **Assimp** command line tool

## Model Requirements

- **File size:** Keep under 5MB for web performance
- **Polycount:** ~10k-50k triangles recommended
- **Textures:** Embedded in GLB or separate (will auto-load)
- **Scale:** Will be auto-scaled in the component
- **Center:** Should be centered at origin (0,0,0)

## Current Status

🔴 **Model file is missing** - The component will show a red wireframe fallback box until you add the file.

Once you place `movie-camera.glb` in this directory, the scroll-driven 3D animation will work automatically!