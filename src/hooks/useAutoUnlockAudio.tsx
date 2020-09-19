import { useEffect } from "react";
import { autoUnlockAudio } from "../lib/active-audio-context";

export default function useAutoUnlockAudio() {
  useEffect(() => {
    autoUnlockAudio();
  }, []);
}
