import type { Locale, Project, SiteContent, SeoMeta } from './types';

export const demoProjects: Project[] = [
  {
    id: 'demo-1',
    slug: 'riverside-pavilion',
    category: 'architecture',
    year: 2024,
    location: 'Purbachal, Dhaka',
    land_area: '9.13 Acres',
    built_area: '12,400 m2',
    status: 'competition',
    cover_image: '/images/project-riverside-01.jpg',
    is_featured: true,
    sort_order: 1,
    media: [{ media_type: 'image', url: '/images/project-riverside-02.jpg', caption: '' }],
    translations: {
      bn: {
        title: 'রিভারসাইড প্যাভিলিয়ন',
        summary: 'খাল-তীরবর্তী একটি জনবান্ধব স্থাপনা, যা প্লাজা হিসেবে প্রথমে কাজ করে।',
        description:
          'অঞ্চলের সর্বজনীন প্লাজার আদলে গড়া নকশাটি প্রথমে ল্যান্ডস্কেপ এবং পরে স্থাপনা হিসেবে পাঠযোগ্য — উন্মুক্ত, ছায়াময় ও শহরের জন্য সবসময় খোলা।'
      },
      en: {
        title: 'Riverside Pavilion',
        summary: 'A public plaza-first civic landmark overlooking the canal.',
        description:
          "Inspired by the public plazas of the region, the design reads as a landscape first and a building second — porous, shaded, and always open to the city."
      }
    }
  },
  {
    id: 'demo-2',
    slug: 'corporate-office-fitout',
    category: 'interior',
    year: 2023,
    location: 'Gulshan, Dhaka',
    land_area: '—',
    built_area: '2,100 m2',
    status: 'built',
    cover_image: '/images/project-office-01.jpg',
    is_featured: true,
    sort_order: 2,
    media: [
      { media_type: 'image', url: '/images/project-office-02.jpg', caption: '' },
      { media_type: 'image', url: '/images/project-office-03.jpg', caption: '' }
    ],
    translations: {
      bn: {
        title: 'কর্পোরেট অফিস ফিট-আউট',
        summary: 'একটি ক্রমবর্ধমান দলের জন্য আলো-নির্ভর কর্মক্ষেত্র নকশা।',
        description:
          'ঢাকার তীব্রতার মধ্যেও প্রশান্ত এক কর্মক্ষেত্র তৈরি করাই ছিল লক্ষ্য — উষ্ণ কাঠের টোন, নরম পার্টিশন এবং কেন্দ্রীয় টেবিল ঘিরে উদার সহযোগিতার জায়গা।'
      },
      en: {
        title: 'Corporate Office Fit-out',
        summary: 'A daylight-driven workplace fit-out for a growing team.',
        description:
          "The brief called for a workplace that felt calm under Dhaka's intensity — warm timber tones, soft partitions, and generous collaboration space around a central table."
      }
    }
  },
  {
    id: 'demo-3',
    slug: 'delta-cultural-pavilion',
    category: 'architecture',
    year: 2022,
    location: 'Sonargaon, Dhaka',
    land_area: '3.4 Acres',
    built_area: '1,850 m2',
    status: 'built',
    cover_image: '/images/project-pavilion-01.jpg',
    is_featured: false,
    sort_order: 3,
    media: [
      { media_type: 'image', url: '/images/project-pavilion-02.jpg', caption: '' },
      { media_type: 'image', url: '/images/project-pavilion-03.jpg', caption: '' }
    ],
    translations: {
      bn: {
        title: 'ব-দ্বীপ কালচারাল প্যাভিলিয়ন',
        summary: 'ব-দ্বীপের বস্তুগত সংস্কৃতিকে উদযাপনকারী একটি প্যাভিলিয়ন।',
        description:
          'ইট, কাঠ ও আলো দিয়ে গড়া প্যাভিলিয়নটি স্থানীয় উপকরণ কীভাবে সমসাময়িক রূপ ধারণ করতে পারে তারই এক নিভৃত অনুসন্ধান।'
      },
      en: {
        title: 'Delta Cultural Pavilion',
        summary: 'A pavilion celebrating the material culture of the delta.',
        description:
          'Built from brick, timber and light, the pavilion is a quiet study of how local materials can carry contemporary form.'
      }
    }
  }
];

export const demoSiteContent: Record<string, Record<Locale, SiteContent>> = {
  hero: {
    bn: {
      title: 'স্থাপত্য যা প্রেক্ষাপট, জলবায়ু ও সংস্কৃতিকে ধারণ করে',
      subtitle: 'অক্ষরেখা — ঢাকা ভিত্তিক স্থাপত্য অনুশীলন',
      cta_label: 'প্রকল্পসমূহ দেখুন'
    },
    en: {
      title: 'Architecture rooted in context, climate & culture',
      subtitle: 'AKKHOREKHA — an architectural practice based in Dhaka',
      cta_label: 'View Projects'
    }
  },
  about: {
    bn: {
      heading: 'আমাদের সম্পর্কে',
      body:
        'অক্ষরেখা একটি ঢাকা-ভিত্তিক স্থাপত্য প্রতিষ্ঠান, যা প্রেক্ষাপট, জলবায়ু ও সংস্কৃতির ভাষায় নকশা তৈরি করে। প্রতিটি সাইট নিজস্ব ভাষায় কথা বলে — আমরা তা শুনি ও সাড়া দিই।'
    },
    en: {
      heading: 'About Us',
      body:
        'AKKHOREKHA is a Dhaka-based architectural practice designing in the language of context, climate and culture. Every site speaks in its own language — we simply try to listen and respond.'
    }
  },
  contact: {
    bn: {
      address: 'বাড়ি ৯/৪, ব্লক ডি, লালমাটিয়া, ঢাকা ১২০৫',
      phone: '+৮৮০ ১৭১১ ৪৫৩ ৫১০',
      email: 'info@akkhorekha.com'
    },
    en: {
      address: 'House 9/4, Block D, Lalmatia, Dhaka 1205',
      phone: '+880 1711 453 510',
      email: 'info@akkhorekha.com'
    }
  },
  footer: {
    bn: { tagline: 'প্রেক্ষাপট, জলবায়ু ও সংস্কৃতির অনুশীলন' },
    en: { tagline: 'A practice of context, climate & culture' }
  }
};

export const demoSeoMeta: Record<string, Record<Locale, SeoMeta>> = {
  home: {
    bn: {
      meta_title: 'অক্ষরেখা | স্থাপত্য প্রতিষ্ঠান, ঢাকা',
      meta_description: 'প্রেক্ষাপট, জলবায়ু ও সংস্কৃতিকে ধারণ করা সমসাময়িক স্থাপত্য — অক্ষরেখা।'
    },
    en: {
      meta_title: 'AKKHOREKHA | Architecture Studio, Dhaka',
      meta_description: 'Contemporary architecture rooted in context, climate and culture — AKKHOREKHA, Dhaka.'
    }
  },
  about: {
    bn: { meta_title: 'আমাদের সম্পর্কে | অক্ষরেখা', meta_description: 'অক্ষরেখা স্থাপত্য প্রতিষ্ঠানের দর্শন ও অনুশীলন সম্পর্কে জানুন।' },
    en: { meta_title: 'About Us | AKKHOREKHA', meta_description: 'Learn about the design philosophy and practice of AKKHOREKHA.' }
  },
  projects: {
    bn: { meta_title: 'প্রকল্পসমূহ | অক্ষরেখা', meta_description: 'অক্ষরেখার নির্বাচিত স্থাপত্য ও অভ্যন্তরীণ নকশা প্রকল্প।' },
    en: { meta_title: 'Projects | AKKHOREKHA', meta_description: 'Selected architecture and interior design projects by AKKHOREKHA.' }
  },
  contact: {
    bn: { meta_title: 'যোগাযোগ | অক্ষরেখা', meta_description: 'অক্ষরেখার সাথে যোগাযোগ করুন।' },
    en: { meta_title: 'Contact | AKKHOREKHA', meta_description: 'Get in touch with AKKHOREKHA.' }
  }
};
