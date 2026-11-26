// =====================================================
// RRETH NESH (/about)
// =====================================================
import "../styles/StaticPage.css";

function About() {
  return (
    <div className="container static-page">
      <div className="card">
        <h1>Rreth nesh</h1>
        <p>
          TreguOnline është një platformë falas ku çdokush mund të postojë
          produktet që dëshiron të shesë dhe të gjejë produktet që dëshiron të
          blejë.
        </p>
        <h2>Si funksionon?</h2>
        <ol>
          <li>Regjistrohu dhe verifiko email-in.</li>
          <li>Plotëso numrin e telefonit dhe qytetin në profil.</li>
          <li>Posto shpalljen me foto dhe përshkrim.</li>
          <li>Ekipi ynë e kontrollon dhe e aprovon shpalljen.</li>
          <li>Blerësit të kontaktojnë me telefon ose me mesazh.</li>
        </ol>
        <h2>Pse e kontrollojmë çdo shpallje?</h2>
        <p>
          Që platforma të jetë e sigurt, pa mashtrime dhe pa produkte të
          ndaluara.
        </p>
      </div>
    </div>
  );
}

export default About;
