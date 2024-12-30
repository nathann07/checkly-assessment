import * as path from 'path'
import { BrowserCheck, MultiStepCheck } from 'checkly/constructs'
import { emailChannel } from '../../alert-channels'
import { playwrightGroup } from './playwright-group.check'

const alertChannels = [emailChannel]

new BrowserCheck('website-check', {
  name: 'Website',
  alertChannels,
  group: playwrightGroup,
  code: {
    entrypoint: path.join(__dirname, 'browser/website.spec.ts')
  },
  runParallel: true,
})

new MultiStepCheck('pokemon-multistep-check', {
  name: 'Pokemon MS',
  alertChannels,
  group: playwrightGroup,
  code: {
    entrypoint: path.join(__dirname, 'multistep/pokemon.spec.ts')
  },
  runParallel: true,
})
