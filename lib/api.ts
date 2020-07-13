import {EpisodeData} from "../interfaces";
import fs from 'fs'
import path from "path";
import yaml from 'js-yaml'

export function getEpisodeData(): Array<EpisodeData> {
  const episodes: Array<EpisodeData> = yaml.safeLoad(
    fs.readFileSync(
      path.join(process.cwd(),
        'episodes.yaml'
      ),
      'utf8'),
    { schema: yaml.FAILSAFE_SCHEMA }
  );

  return episodes
}
