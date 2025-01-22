import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {
  async createAndUploadPdf(
    userId: number,
    userEmail: string,
    numberOfUnits: number,
    pricePerUnit: number,
    totalCost: number,
    uploadDir: string,
  ): Promise<string> {
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate PDF file path
    const fileName = `user_${userId}_${Date.now()}.pdf`;
    const filePath = path.join(uploadDir, fileName);

    // Create a PDF document
    const doc = new PDFDocument();

    // Pipe the PDF to the file system
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Title of the document
    doc.fontSize(18).text('User Agreement and Purchase Contract', { align: 'center' });
    doc.moveDown(1);

    // Adding user info and contract details
    const contractContent = `
    This Agreement is entered into by and between:

    User Email: ${userEmail}
    Date: ${new Date().toLocaleDateString()}

    Terms of the Agreement:

    1. Units Purchased:
        The user agrees to purchase a total of ${numberOfUnits} unit(s) at a price of $${pricePerUnit} per unit.
    
    2. Total Payment:
        The total cost of the purchased units amounts to $${totalCost}.
    
    3. Payment Terms:
        The user agrees to make the payment in full. Payment should be completed by [insert payment method].

    4. Delivery Terms:
        Delivery of the purchased units will occur within [insert number of days] days after payment is received.

    5. Warranty:
        The purchased units come with a warranty period of [insert warranty period] from the date of delivery.

    6. Refund and Return Policy:
        The user has the right to request a refund or return the units within [insert return period] if the product is found to be defective or not as described.

    7. User Obligations:
        The user agrees to use the purchased units only for their intended purpose, and in accordance with the terms outlined in this agreement.

    8. Termination of Agreement:
        Either party may terminate the agreement in case of a breach by the other party.

    9. Confidentiality:
        Both parties agree to maintain confidentiality regarding all terms of this contract.

    Signature of the Company Representative: ___________________________
    Signature of the User: ___________________________
    `;

    // Add the contract content to the PDF
    doc.fontSize(12).text(contractContent, {
      align: 'left',
      paragraphGap: 5,
      lineGap: 5,
    });

    // Finalizing the PDF file
    doc.end();

    // Wait for the file to finish writing
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    return filePath; // Return the file path for further use
  }

  async createPdf(userId:number,bufferId:number,pathUrl:string)
  {
    

  }
}
