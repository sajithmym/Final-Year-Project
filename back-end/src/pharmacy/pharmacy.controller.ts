import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('pharmacy')
export class PharmacyController {

    constructor(
        private readonly pharmacyService: PharmacyService,
    ) { }

    // get Finesh_Accept_appointments for a patient
    @UseGuards(JwtAuthGuard)
    @Get('Finesh_appointments')
    Finesh_Accept_appointmentsDoctor() {
        return this.pharmacyService.getFineshAcceptedAppoinments();
    }

    // set amount for appointment and set status to Payment Pending
    @UseGuards(JwtAuthGuard)
    @Post('setAmount-status-change/:id')
    setAmount(@Param('id') id: number, @Body('amount') amount: number) {
        return this.pharmacyService.setAmount_status_change(id, amount);
    }
}
