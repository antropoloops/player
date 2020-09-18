import React, { useMemo } from "react";
import { Audioset } from "../../../audioset";
import { KeyboardController } from "../../../player/Control";
import Layout from "../../components/layout/Layout";
import { useDeviceType } from "../../hooks/useDeviceType";
import { useKeyboardListener } from "../../hooks/useKeyboardListener";
import useLocale from "../../hooks/useLocale";
import useSimplePlayer from "../../hooks/useSimplePlayer";
import BackToLink from "../BackToLink";
import PromptExit from "../shared/PromptExit";
import SimpleTrack from "./SimpleTrack";
import Visuals from "./Visuals";

type Props = {
  audioset: Audioset;
};

const SimplePlayerScreen: React.FC<Props> = ({ audioset }) => {
  const { isDesktop } = useDeviceType();
  const { formatMessage: f } = useLocale();
  const [state, dispatch] = useSimplePlayer(audioset);

  const keyboard = useMemo(
    () =>
      new KeyboardController(audioset, {
        startClip: (clipId: string) =>
          dispatch({
            type: "trigger",
            playing: true,
            clipId,
            trackId: audioset.index.clipById[clipId].trackId,
          }),
        stopClip: (clipId: string) =>
          dispatch({
            type: "trigger",
            playing: false,
            clipId,
            trackId: audioset.index.clipById[clipId].trackId,
          }),
      }),
    [audioset, dispatch]
  );
  useKeyboardListener(keyboard);

  const isPlaying = !!Object.values(state.tracks).find(
    (track) => track.playing
  );

  return (
    <Layout
      title={audioset.meta.title}
      backTo={audioset.meta.parent_path}
      visuals={
        audioset && (
          <Visuals audioset={audioset} state={state} keyboard={keyboard} />
        )
      }
    >
      <PromptExit when={isPlaying} message={f("ask-leave-player")} />
      {isDesktop && (
        <BackToLink
          to={audioset.meta.parent_path}
          label={audioset.meta.title}
        />
      )}
      <div className="pb-4">
        {audioset.tracks?.map((track) => (
          <SimpleTrack
            key={track.id}
            audioset={audioset}
            keyboard={keyboard}
            track={track}
            state={state}
            onClipClick={(clipId) =>
              dispatch({
                type: "trigger",
                clipId,
                trackId: track.id,
                playing: !state.clips[clipId]?.playing,
              })
            }
          />
        ))}
      </div>
    </Layout>
  );
};

export default SimplePlayerScreen;
