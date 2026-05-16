import { ConfigService } from '@nestjs/config'

import type { SmsOptions } from '../../infrastructure/sms/interfaces'

export function getExolveConfig(configService: ConfigService): SmsOptions {
	return {
		apiKey: configService.get('exolve.apiKey') ?? '',
		sender: configService.get('exolve.sender')
	}
}
