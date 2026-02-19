import './App.css';
import NavRail from './components/NavRail';
import ContextRail from './components/ContextRail';
import Hero from './sections/Hero';
import Part1Taxonomy from './sections/Part1Taxonomy';
import Part1Danger from './sections/Part1Danger';
import Part1Metrics from './sections/Part1Metrics';
import Part2Architecture from './sections/Part2Architecture';
import Part2Retrieval from './sections/Part2Retrieval';
import Part2Zones from './sections/Part2Zones';
import Part2Calibration from './sections/Part2Calibration';
import Part3Eval from './sections/Part3Eval';
import Part4Hard from './sections/Part4Hard';
import References from './sections/References';

export default function App() {
  return (
    <div className="panel-bg">
      <div className="layout-grid">
        <NavRail />

        <main className="main-content">
          <Hero />
          <Part1Taxonomy />
          <Part1Danger />
          <Part1Metrics />
          <Part2Architecture />
          <Part2Retrieval />
          <Part2Zones />
          <Part2Calibration />
          <Part3Eval />
          <Part4Hard />
          <References />
        </main>

        <ContextRail />
      </div>
    </div>
  );
}
