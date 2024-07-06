import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

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

    // get payment done appoinments
    @UseGuards(JwtAuthGuard)
    @Get('paid_appointments')
    Payment_done_appointmentsDoctor() {
        return this.pharmacyService.Get_payment_done_Appoinments();
    }

    @UseGuards(JwtAuthGuard)
    @Post('UploadReport/:id')
    @UseInterceptors(FileInterceptor('report', {
        storage: diskStorage({
            destination: './patient_Report', // save to the patient_Report folder
            filename: (req, file, callback) => {
                const extension = extname(file.originalname).toLowerCase();
                if (extension !== '.pdf') {
                    return callback(new HttpException('Only PDF files are allowed!', HttpStatus.BAD_REQUEST), null);
                }
                const filename = `${file.originalname.replace(extension, '')}_-_${uuidv4()}${extension}`;
                callback(null, filename);
            },
        }),
    }))
    async saveReport(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new HttpException('No file uploaded.', HttpStatus.BAD_REQUEST);
        }
        // Assuming saveReport method is adjusted to handle file input
        return this.pharmacyService.saveReport(id, file);
    }

}

