import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { getExolveConfig } from '../../config/factories'
import { MailModule } from '../../infrastructure/mail/mail.module'
import { SmsModule } from '../../infrastructure/sms/sms.module'

import { NotificationsController } from './notifications.controller'
import { NotificationsService } from './notifications.service'

@Module({
	imports: [
		MailModule,
		SmsModule.registerAsync({
			useFactory: getExolveConfig,
			inject: [ConfigService]
		})
	],
	controllers: [NotificationsController],
	providers: [NotificationsService]
})
export class NotificationsModule {}
