import { useState } from "react";
import styles from "./SignUp.module.css";
import { IMAGES } from "@/assets/images";

export default function SignUp() {
  const [selectedPet, setSelectedPet] = useState(null);

  const handleSelect = (pet) => {
    setSelectedPet(pet);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    console.log("Username:", username);
    console.log("Selected Pet:", selectedPet);
  };

  return (
    <div className={styles.signContainer}>
      <div className={styles.headerContainer}>
        <img
          src={IMAGES.catSignUp}
          alt="Sign up banner"
          className={styles.catSignUp}
        />

        <div className={styles.signUpContainer}>
          <h1 className={styles.heading}>Your Pet Awaits!</h1>

          <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" />

            <div className={styles.species}>
              <button
                type="button"
                className={`${styles.petBtn} ${
                  selectedPet === "dog" ? styles.activePet : ""
                }`}
                onClick={() => handleSelect("dog")}
              >
                <img src={IMAGES.dog2Head} alt="Dog" />
              </button>

              <button
                type="button"
                className={`${styles.petBtn} ${
                  selectedPet === "cat" ? styles.activePet : ""
                }`}
                onClick={() => handleSelect("cat")}
              >
                <img src={IMAGES.catHead} alt="Cat" />
              </button>

              <button
                type="button"
                className={`${styles.petBtn} ${
                  selectedPet === "bunny" ? styles.activePet : ""
                }`}
                onClick={() => handleSelect("bunny")}
              >
                <img src={IMAGES.bunnyHead} alt="Bunny" />
              </button>
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>

      <p>It only takes a minute to join your new companion!</p>
    </div>
  );
}
