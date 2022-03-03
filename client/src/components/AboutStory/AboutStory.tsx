import styles from "./AboutStory.module.scss";

const AboutStory: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>About the Inspiration Jar</h1>
      <h2>learn how it all started</h2>
      <div className={styles.row}>
        <img src="img/tree.svg" alt="christmas tree" className={styles.img} />
        <div className={styles.text}>
          <strong className={styles.title}>Merry Birthday!</strong>
          <p>
            For my 16th birthday (which also happens to be Christmas), my family
            decided to do a white elephant gift exchange. Scanning my room for
            gift ideas, I found a plastic jar and recalled a classic Taiwanese
            present: a jar filled with origami stars, each representing a wish.
            With no origami paper around, however, I took some index cards,
            sliced them into six pieces each, and began scribbling words of
            encouragement. When the gift exchange began, my dad unsealed my gift
            to reveal a jar wrapped in orange paper, labeled on the side in
            permanent marker: Inspiration Pills™. After unraveling a pill and
            deciphering my sloppy handwriting, my dad embraced me.
          </p>
        </div>
      </div>
      <div className={styles.row}>
        <img src="img/covid.svg" alt="covid mask" className={styles.img} />
        <div className={styles.text}>
          <strong className={styles.title}>Isolation and Covid</strong>
          <p>
            Soon after, COVID hit. After months of quarantine, many of my
            classmates were struggling. Thinking back to my dad's smile as he
            received my gift, I spent the next couple months learning fullstack
            web development, recreating the idea of Inspiration Pills™ in the
            form of a social media website. Within hours after launching the
            site, multiple users had registered and submitted messages: “You’re
            awesome!”, “Your friends don't know how lucky they are to have
            you!”, “You look great today!” One afternoon, a classmate from
            English class texted me that after a rough week of online school,
            reading those messages made her day. I realized that we were never
            alone in our battle with isolation.
          </p>
        </div>
      </div>
      <div className={styles.row}>
        <img
          src="img/sprout.svg"
          alt="sprouting plant"
          className={styles.img}
        />
        <div className={styles.text}>
          <strong className={styles.title}>Goal</strong>
          <p>
            My hope is that we can recreate this act of giving and magnify it
            with the power of the web. Not only do the visitors feel heartwarmed
            by everyone's encouraging messages, but the authors of those
            messages also feel happier knowing that they made someone smile.
            Hopefully, we can propogate this cycle of encouragement and make the
            world a little more motivated and inspired!
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutStory;
