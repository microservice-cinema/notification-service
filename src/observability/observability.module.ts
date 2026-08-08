import { Module } from '@nestjs/common'

import { MetricsModule } from './metrics/metricsModule'

@Module({
	imports: [MetricsModule]
})
export class ObservabilityModule {}
