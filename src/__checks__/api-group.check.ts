import { AlertEscalationBuilder, CheckGroup, RetryStrategyBuilder } from 'checkly/constructs'
import { emailChannel } from '../alert-channels'
const alertChannels = [emailChannel]
/*
* In this example, we bundle checks using a Check Group. We add checks to this group in two ways:
* 1. By passing the `CheckGroup` object for the `group` property of the check.
* 2. By defining a glob pattern like `*.spec.ts` that matches Browser Checks , just like at the Project level, e.g.
*
*  browserChecks: {
*    testMatch: './*.spec.ts'
*  }
*
* You can use either or both. In this example we show option 1.
**/

export const apiCheckGroup = new CheckGroup('api-check-group', {
  name: 'API Check Group',
  activated: true,
  muted: false,
  runtimeId: '2024.02',
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['api', 'group'],
  environmentVariables: [],
  apiCheckDefaults: {},
  concurrency: 100,
  alertChannels,
  /* All checks on this check group will have this alert escalation policy */
  alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1),
  retryStrategy: RetryStrategyBuilder.linearStrategy({ baseBackoffSeconds: 30, maxRetries: 3, sameRegion: false }),
  runParallel: true,
})
