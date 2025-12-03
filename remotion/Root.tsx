import { Composition } from "remotion";
import { AnimationComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CartoonAnimation"
        component={AnimationComposition as any}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          scenes: [],
          metadata: {
            fps: 30,
            width: 1920,
            height: 1080,
            totalDuration: 10,
          },
        }}
      />
    </>
  );
};
