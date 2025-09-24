// src/modules/pet/pages/Pet.jsx

import { useState, useEffect } from "react";
import PetSprite from "@/modules/pet/components/PetSprite";
import PetActions from "@/modules/pet/components/PetActions";
import { getScheduledMood } from "@/modules/pet/utils/MoodManager";
import styles from "@/modules/pet/pages/Pet.module.css";

export default function Pet() {
  const [mood, setMood] = useState("walking");
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!manualOverride) {
        const scheduledMood = getScheduledMood();
        setMood(scheduledMood);
      }
    }, 1000 * 60); // check every minute
    return () => clearInterval(interval);
  }, [manualOverride]);

  const handleAction = (action) => {
    let actionMood = "walking";

    if (action === "feed") actionMood = "feedAction";
    if (action === "play") actionMood = "playAction";
    if (action === "shower") actionMood = "showerAction";

    setMood(actionMood);
    setManualOverride(true);

    setTimeout(() => {
      setMood("walking");
      setManualOverride(false);
    }, 5000);
  };

  return (
    <div className={styles.petContainer}>
      <section className={styles.petCopy}>
        <PetSprite mood={mood} />
        <PetActions handleAction={handleAction} />
      </section>
    </div>
  );
}
