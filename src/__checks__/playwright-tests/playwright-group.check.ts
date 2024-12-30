import { AlertEscalationBuilder, CheckGroup, RetryStrategyBuilder } from 'checkly/constructs'
import { emailChannel } from '../../alert-channels'
const alertChannels = [emailChannel]

export const playwrightGroup = new CheckGroup('playwright-tests-group', {
  name: 'Playwright Group',
  activated: true,
  muted: false,
  runtimeId: '2024.02',
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['playwright', 'group'],
  environmentVariables: [],
  apiCheckDefaults: {},
  concurrency: 100,
  alertChannels,
  /* All checks on this check group will have this alert escalation policy */
  alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1),
  retryStrategy: RetryStrategyBuilder.linearStrategy({ baseBackoffSeconds: 30, maxRetries: 3, sameRegion: false }),
  runParallel: true,
})