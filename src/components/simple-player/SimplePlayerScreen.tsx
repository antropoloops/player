import React, { useEffect, useMemo, useState } from "react";
import { Audioset } from "../../audioset";
import { KeyboardController } from "../../player/KeyboardController";
import Layout from "../../components/layout/Layout";
import useAutoUnlockAudio from "../../hooks/useAutoUnlockAudio";
import { useDeviceType } from "../../hooks/useDeviceType";
import { useKeyboardListener } from "../../hooks/useKeyboardListener";
import useLocale from "../../hooks/useLocale";
import BackToLink from "../BackToLink";
import PromptExit from "../shared/PromptExit";
import TrackContainer from "./TrackContainer";
import Visuals from "./Visuals";
import ClipList from "./ClipList";
import ClipRibbon from "./ClipRibbon";
import usePlayer4 from "../../hooks/usePlayer4";
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
  const { state, controller } = usePlayer4(audioset);
  const isPoly = audioset.audio.mode === "1"; // FIXME: change to a name
  const keyboard = useMemo(() => new KeyboardController(audioset, controller), [
    audioset,
    controller,
  ]);
  useKeyboardListener(keyboard);

  useEffect(() => {
    if (window.location.search === "?ribbon") {
      setMode("ribbon");
    }
  }, []);

  const { status } = state;

  const isPlaying = !!Object.values(status.tracks).find(
    (track) => track.playing
  );

  const toggleClip = (clipId: string) =>
    status.clips[clipId].playing
      ? controller.stopClip(clipId)
      : controller.startClip(clipId);

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
            status={status.tracks[track.id]}
            onStopTrack={() => controller.stopTrack(track.id)}
          >
            {mode === "ribbon" ? (
              <ClipRibbon
                audioset={audioset}
                track={track}
                state={state}
                isStream={!isPoly}
                onClipClicked={toggleClip}
              />
            ) : (
              <ClipList
                audioset={audioset}
                track={track}
                status={state.status}
                keyboard={keyboard}
                isStream={!isPoly}
                onClipClicked={toggleClip}
              />
            )}
          </TrackContainer>
        ))}
      </div>
    </Layout>
  );
};

export default SimplePlayerScreen;
