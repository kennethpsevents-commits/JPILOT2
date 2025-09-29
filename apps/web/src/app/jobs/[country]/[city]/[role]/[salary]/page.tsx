import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@wearejobpilot/ui';
import { Button } from '@wearejobpilot/ui';

export const revalidate = 3600; // ISR: 1 uur

interface Props {
  params: { 
    country: string; 
    city: string; 
    role: string; 
    salary: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, city, role, salary } = params;
  
  const title = `${role} jobs in ${city}, ${country} – €${salary}`;
  const description = `Vind ${role} vacatures in ${city} met salaris vanaf €${salary}. Ontdek de beste carrièremogelijkheden in ${city}, ${country}.`;

  return {
    title,
    description,
    keywords: [
      `${role} jobs`,
      `${city} jobs`,
      `${country} jobs`,
      `${role} salary ${city}`,
      `vacatures ${city}`,
      `carrière ${city}`,
      `werk ${city}`
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'nl_NL',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://www.wearejobpilot.com/jobs/${country}/${city}/${role}/${salary}`,
    },
  };
}

export default function JobLanding({ params }: Props) {
  const { country, city, role, salary } = params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `${role} (${salary})`,
    description: `AI gegenereerde pSEO-pagina voor ${role} jobs in ${city}, ${country}.`,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: country.toUpperCase(),
        addressLocality: city,
        addressRegion: city
      }
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: {
        "@type": "QuantitativeValue",
        minValue: parseInt(salary),
        unitText: "MONTH"
      }
    },
    employmentType: "FULL_TIME",
    datePosted: new Date().toISOString(),
    validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    hiringOrganization: {
      "@type": "Organization",
      name: "WeAreJobPilot",
      url: "https://www.wearejobpilot.com"
    }
  };

  // Mock job data for this specific location/role combination
  const mockJobs = [
    {
      id: 1,
      title: `${role} - Senior Level`,
      company: 'TechCorp International',
      location: city,
      salary: `€${salary}+`,
      description: `Senior ${role} positie in ${city}. Werk aan innovatieve projecten in een dynamische omgeving.`
    },
    {
      id: 2,
      title: `${role} - Mid Level`,
      company: 'Digital Solutions BV',
      location: city,
      salary: `€${parseInt(salary) - 10}k`,
      description: `Mid-level ${role} rol in het hart van ${city}. Perfecte kans om je carrière te ontwikkelen.`
    },
    {
      id: 3,
      title: `${role} - Junior Level`,
      company: 'StartupXYZ',
      location: city,
      salary: `€${parseInt(salary) - 20}k`,
      description: `Junior ${role} positie in ${city}. Ideaal voor starters die willen groeien.`
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {role} Jobs in {city}, {country}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Salaris vanaf €{salary} • {mockJobs.length} vacatures beschikbaar
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Bekijk Alle Vacatures
            </Button>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {role} Vacatures in {city}
          </h2>
          <p className="text-lg text-gray-600">
            Ontdek de beste {role.toLowerCase()} carrièremogelijkheden in {city}, {country}.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {job.company} • {job.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">
                      {job.salary}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Actief
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="pt-4">
                    <Button className="w-full">
                      Solliciteer Nu
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Klaar om je droombaan te vinden?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Sluit je aan bij duizenden professionals die hun carrière hebben versneld met WeAreJobPilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Gratis Account Aanmaken
            </Button>
            <Button size="lg" variant="outline">
              Meer Vacatures Bekijken
            </Button>
          </div>
        </div>
      </div>

      {/* Local Information */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Waarom {city}?
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Groeiende tech sector in {city}</li>
                <li>• Hoge levenskwaliteit en cultuur</li>
                <li>• Uitstekende transportverbindingen</li>
                <li>• Diverse carrièremogelijkheden</li>
                <li>• Internationale bedrijven en startups</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {role} Carrière Tips
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Blijf up-to-date met nieuwe technologieën</li>
                <li>• Bouw een sterk professioneel netwerk op</li>
                <li>• Investeer in continue leerontwikkeling</li>
                <li>• Toon je soft skills tijdens sollicitaties</li>
                <li>• Overweeg certificeringen in je vakgebied</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
