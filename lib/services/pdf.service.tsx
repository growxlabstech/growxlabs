import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { AgreementPDF, InvoicePDF } from '../templates/PDFTemplates';
import { supabaseAdmin } from '../supabase/admin';

export class PDFService {
  static async generateAgreement(data: any): Promise<string> {
    console.log("PDF SERVICE: GENERATING AGREEMENT ->", data.id);
    
    // Mapping for template
    const templateData = {
      ...data,
      total_value: data.total_amount,
      advance: data.advance_amount,
      balance: data.balance_amount
    };

    const buffer = await pdf(<AgreementPDF data={templateData} />).toBuffer();
    const fileName = `agreement_${data.client_id}_${Date.now()}.pdf`;
    
    const { data: uploadData, error } = await supabaseAdmin.storage
      .from('documents')
      .upload(`agreements/${fileName}`, buffer, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('documents')
      .getPublicUrl(uploadData.path);

    return publicUrl;
  }

  static async generateInvoice(data: any): Promise<string> {
    console.log("PDF SERVICE: GENERATING INVOICE ->", data.client_id);
    const buffer = await pdf(<InvoicePDF data={data} />).toBuffer();
    const fileName = `invoice_${data.client_id}_${Date.now()}.pdf`;

    const { data: uploadData, error } = await supabaseAdmin.storage
      .from('documents')
      .upload(`invoices/${fileName}`, buffer, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('documents')
      .getPublicUrl(uploadData.path);

    return publicUrl;
  }
}
