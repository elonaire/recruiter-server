import { ApiProperty } from '@nestjs/swagger';

export class MailBody {
    @ApiProperty()
    sender?: string;

    @ApiProperty()
    recipient: string;

    @ApiProperty()
    subject: string;

    @ApiProperty()
    htmlBody: string;
}