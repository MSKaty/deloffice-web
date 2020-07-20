import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class MetadataService {
    constructor(
        private _meta: Meta,
        private _title: Title
    ) { }

    generateTags(tags) {
        tags = {
            title: 'DelOffice Ltd',
            description: 'DelOffice is the largest online office supplies store in Mauritius. Browse our full selection of stationery supplies, staplers, punches, multipurpose A4 paper, carbonless paper, files, envelopes, pens, pencils, markers, messroom supplies, kitchen appliances, utensils, cleaning supplies, cleaning tools, cleaning products, ink cartridges and toners.',
            slug: '',
            image: '/assets/img/logo.png',
            keywords: 'deloffice, roll n sheet, print n pack, deloffice group, stationery shop, stationery, port louis, terre rouge, le hochet, mauritius, ile maurice, maurice, pens, printers, ink, toners, paper, papier, office supplies, office supplies in mauritius, delloffice, dell office, deloffice mauritius, deloffice, ticketing, mauritius, ticketing mauritius, ticketing solutions, thermal paper mauritius, thermal paper, thermal, stationery, office supplies, office stationery mauritius, del office, deloffice mauritius, roll n sheet, print n pack, rollux, rollux mauritius',
            ...tags
        }

        this._meta.updateTag({ name: 'description', content: tags.description });
        this._meta.updateTag({ name: 'keywords', content: tags.keywords });

        this._meta.updateTag({ name: 'twitter:card', content: 'summary' });
        this._meta.updateTag({ name: 'twitter:title', content: tags.title });
        this._meta.updateTag({ name: 'twitter:description', content: tags.description });
        this._meta.updateTag({ name: 'twitter:image', content: tags.image });

        this._meta.updateTag({ name: 'og:type', content: tags.image });
        this._meta.updateTag({ name: 'og:site_name', content: tags.title });
        this._meta.updateTag({ name: 'og:title', content: tags.title });
        this._meta.updateTag({ name: 'og:description', content: tags.description });
        this._meta.updateTag({ name: 'og:image', content: tags.image });
        this._meta.updateTag({ name: 'og:url', content: `https://deloffice.mu` });
    }
}