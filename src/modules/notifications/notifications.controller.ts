import type { OtpRequestedEvent } from '@microservice-cinema/contracts'
import { Controller, Logger } from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'

import { RmqService } from '../../infrastructure/rmq/rmq.service'

import { NotificationsService } from './notifications.service'


@Controller()
export class NotificationsController {
	private readonly logger = new Logger(NotificationsController.name)

	public constructor(
		private readonly notificationsService: NotificationsService,
		private readonly rmqService: RmqService
	) {}

	@EventPattern('auth.otp.requested')
	public async otpRequested(
		@Payload() data: OtpRequestedEvent,
		@Ctx() ctx: RmqContext
	) {
		try {
			await this.notificationsService.sendOtp(data)

			this.rmqService.ack(ctx)
		} catch (error) {
			this.logger.error('OTP processing error: ', error.message ?? error)

			this.rmqService.nack(ctx)
		}
	}
}
