import './heatmap.css';
import { json } from 'd3-fetch';

async function createHeatmap() {
  var data = await json('../data/nyc_weather_data.json');
}
