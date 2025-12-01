import React from 'react'
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion'
import { Scene as SceneType } from '@/types/animation'

interface AnimationCompositionProps {
  scenes: SceneType[]
  metadata: {
    fps: number
    width: number
    height: number
    totalDuration: number
  }
}

export const AnimationComposition: React.FC<AnimationCompositionProps> = ({
  scenes,
  metadata,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Calculate which scene should be displayed
  let currentSceneIndex = 0
  let sceneStartFrame = 0

  for (let i = 0; i < scenes.length; i++) {
    const sceneDurationInFrames = Math.floor(scenes[i].duration * fps)
    if (frame < sceneStartFrame + sceneDurationInFrames) {
      currentSceneIndex = i
      break
    }
    sceneStartFrame += sceneDurationInFrames
  }

  const currentScene = scenes[currentSceneIndex]
  if (!currentScene) {
    return (
      <AbsoluteFill className="bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-4xl font-bold text-gray-400">No scenes</div>
      </AbsoluteFill>
    )
  }

  const sceneFrame = frame - sceneStartFrame

  return (
    <AbsoluteFill>
      {/* Background */}
      <div
        className="absolute inset-0"
        dangerouslySetInnerHTML={{ __html: currentScene.background }}
      />

      {/* Characters */}
      {currentScene.characters.map((character, idx) => {
        // Check for animations
        const characterAnimations = currentScene.animations.filter(
          (anim) => anim.targetId === character.id
        )

        let x = character.position.x
        let y = character.position.y
        let scale = character.scale
        let opacity = 1
        let expression = 'neutral'

        // Apply animations
        characterAnimations.forEach((anim) => {
          const animStartFrame = anim.startTime * fps
          const animDuration = anim.duration * fps

          if (
            sceneFrame >= animStartFrame &&
            sceneFrame < animStartFrame + animDuration
          ) {
            const progress = (sceneFrame - animStartFrame) / animDuration

            switch (anim.type) {
              case 'move':
                x = interpolate(progress, [0, 1], [anim.from.x, anim.to.x])
                y = interpolate(progress, [0, 1], [anim.from.y, anim.to.y])
                break
              case 'scale':
                scale = interpolate(
                  progress,
                  [0, 1],
                  [anim.from.scale || 1, anim.to.scale || 1]
                )
                break
              case 'appear':
                opacity = interpolate(progress, [0, 1], [0, 1])
                scale = spring({
                  frame: sceneFrame - animStartFrame,
                  fps,
                  config: { damping: 10, stiffness: 100 },
                })
                break
              case 'expression':
                expression = anim.to
                break
            }
          }
        })

        // Check for dialogue to trigger talking expression
        const activeDi alogue = currentScene.dialogue.find(
          (d) =>
            d.characterId === character.id &&
            sceneFrame >= d.startTime * fps &&
            sceneFrame < (d.startTime + d.duration) * fps
        )

        if (activeDi alogue) {
          expression = 'talking'
        }

        return (
          <div
            key={character.id}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
              width: '100px',
              height: '120px',
              color: character.color,
            }}
            dangerouslySetInnerHTML={{ __html: character.sprite }}
          />
        )
      })}

      {/* Dialogue Subtitles */}
      {currentScene.dialogue.map((dialogue) => {
        const dialogueStartFrame = dialogue.startTime * fps
        const dialogueDuration = dialogue.duration * fps

        if (
          sceneFrame >= dialogueStartFrame &&
          sceneFrame < dialogueStartFrame + dialogueDuration
        ) {
          const character = currentScene.characters.find(
            (c) => c.id === dialogue.characterId
          )

          return (
            <div
              key={dialogue.characterId + dialogue.startTime}
              className="absolute bottom-20 left-0 right-0 flex justify-center"
            >
              <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border-4 border-purple-300 max-w-3xl">
                <p className="text-2xl font-bold text-center text-gray-800">
                  <span className="text-primary">{character?.name}:</span>{' '}
                  {dialogue.text}
                </p>
              </div>
            </div>
          )
        }
        return null
      })}

      {/* Scene Transition */}
      {sceneFrame < fps * 0.3 && (
        <AbsoluteFill
          style={{
            backgroundColor: 'white',
            opacity: interpolate(sceneFrame, [0, fps * 0.3], [1, 0]),
          }}
        />
      )}
    </AbsoluteFill>
  )
}
