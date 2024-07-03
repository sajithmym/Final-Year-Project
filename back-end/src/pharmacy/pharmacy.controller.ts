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
}
