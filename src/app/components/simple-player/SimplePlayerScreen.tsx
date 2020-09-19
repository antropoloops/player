import React, { useMemo } from "react";
import { Audioset } from "../../../audioset";
import { KeyboardController } from "../../../player/KeyboardController";
import Layout from "../../components/layout/Layout";
import useAutoUnlockAudio from "../../hooks/useAutoUnlockAudio";
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
  useAutoUnlockAudio();
  const { isDesktop } = useDeviceType();
  const { formatMessage: f } = useLocale();
  const [state, dispatch] = useSimplePlayer(audioset);

  const keyboard = useMemo(
    () =>
      new KeyboardController(audioset, {
        startClip: (clipId: string) =>
          dispatch({
            type: "event",
            event: {
              type: "clip",
              trigger: "on",
              clipId,
              trackId: audioset.index.clipById[clipId].trackId,
            },
          }),
        stopClip: (clipId: string) =>
          dispatch({
            type: "event",
            event: {
              type: "clip",
              trigger: "off",
              clipId,
              trackId: audioset.index.clipById[clipId].trackId,
            },
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
      <div className="">
        {audioset.tracks?.map((track) => (
          <SimpleTrack
            key={track.id}
            audioset={audioset}
            keyboard={keyboard}
            track={track}
            state={state}
            onClipClick={(clipId) =>
              dispatch({
                type: "event",
                event: {
                  type: "clip",
                  trigger: !state.clips[clipId]?.playing ? "on" : "off",
                  clipId,
                  trackId: track.id,
                },
              })
            }
            onStopTrack={() =>
              dispatch({
                type: "event",
                event: {
                  type: "track",
                  trigger: "off",
                  trackId: track.id,
                },
              })
            }
          />
        ))}
      </div>
    </Layout>
  );
};

export default SimplePlayerScreen;
