// ScrollSyncedMesh.tsx
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

type ScrollSyncedMeshProps = {
  rect: { width: number; height: number; offsetTop: number }
  scrollY: React.MutableRefObject<number>
}

export default function ScrollSyncedMesh({ rect, scrollY }: ScrollSyncedMeshProps) {
  const meshRef = useRef<Mesh>(null!)

  useFrame(() => {
    if (!rect || !meshRef.current) return

    const y = rect.offsetTop - scrollY.current
    meshRef.current.position.y = -y
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[rect.width, rect.height]} />
      <meshBasicMaterial color="hotpink" />
    </mesh>
  )
}
