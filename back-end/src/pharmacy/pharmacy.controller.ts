import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';

@Controller('pharmacy')
export class PharmacyController {

    constructor(
        private readonly pharmacyService: PharmacyService,
    ) { }

    // get Finesh_Accept_appointments for a patient
    @Get('Finesh_appointments')
    Finesh_Accept_appointmentsDoctor() {
        return this.pharmacyService.getFineshAcceptedAppoinments();
    }
}
