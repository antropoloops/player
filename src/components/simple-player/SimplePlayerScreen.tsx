import React, { useEffect, useMemo, useState } from "react";
import { Audioset } from "../../audioset";
import { KeyboardController } from "../../player/KeyboardController";
import Layout from "../../components/layout/Layout";
import useAutoUnlockAudio from "../../hooks/useAutoUnlockAudio";
import { useDeviceType } from "../../hooks/useDeviceType";
import { useKeyboardListener } from "../../hooks/useKeyboardListener";
import useLocale from "../../hooks/useLocale";
import useSimplePlayer from "../../hooks/useSimplePlayer";
import BackToLink from "../BackToLink";
import PromptExit from "../shared/PromptExit";
import TrackContainer from "./TrackContainer";
import Visuals from "./Visuals";
import ClipList from "./ClipList";
import ClipRibbon from "./ClipRibbon";
// import IconButton from "../shared/IconButton";
// import { ReactComponent as ListIcon } from "../icons/view_column-24px.svg";
// import { ReactComponent as RibbonIcon } from "../icons/view_module-24px.svg";

type Props = {
  audioset: Audioset;
};

type Mode = "list" | "ribbon";

const SimplePlayerScreen: React.FC<Props> = ({ audioset }) => {
  useAutoUnlockAudio();
  const [mode, setMode] = useState<Mode>("list");
  const { isDesktop } = useDeviceType();
  const { formatMessage: f } = useLocale();
  const [state, dispatch] = useSimplePlayer(audioset);
  const isPoly = audioset.audio.mode === "1"; // FIXME: change to a name

  useEffect(() => {
    if (window.location.search === "?ribbon") {
      setMode("ribbon");
    }
  }, []);

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

  const toggleClip = (clipId: string, trackId: string) =>
    dispatch({
      type: "event",
      event: {
        type: "clip",
        trigger: !state.clips[clipId]?.playing ? "on" : "off",
        clipId,
        trackId,
      },
    });

  const stopTrack = (trackId: string) =>
    dispatch({
      type: "event",
      event: {
        type: "track",
        trigger: "off",
        trackId,
      },
    });

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
          <TrackContainer
            key={track.id}
            track={track}
            status={state.tracks[track.id]}
            onStopTrack={() => stopTrack(track.id)}
          >
            {mode === "ribbon" ? (
              <ClipRibbon
                audioset={audioset}
                track={track}
                state={state}
                isStream={!isPoly}
                onClipClicked={(clipId) => toggleClip(clipId, track.id)}
              />
            ) : (
              <ClipList
                audioset={audioset}
                track={track}
                state={state}
                keyboard={keyboard}
                isStream={!isPoly}
                onClipClicked={(clipId) => toggleClip(clipId, track.id)}
              />
            )}
          </TrackContainer>
        ))}
      </div>
    </Layout>
  );
};

export default SimplePlayerScreen;
