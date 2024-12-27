import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/helpers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = await getSiteUrl();

    return [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
    ];
}
