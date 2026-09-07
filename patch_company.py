import re

company_data = """export const COMPANY_INFO = {
  nameFa: 'طیوران صنعت پویا',
  nameEn: 'TOYOORAN',
  tagline: 'مشاور، طراح و مجری توسعه و بهره‌برداری پروژه‌های صنعتی',
  subTagline: 'تنها تولیدکننده بشقاب‌های پروانه‌ای تحت لیسانس Butterfly Concepts آمریکا با تاییدیه FDA | تولیدکننده تخصصی جت هیتر و ماشین‌آلات خوراک',
  experienceYears: '۵۰+',
  completedProjects: '۲۰۰+',
  activeProvinces: 'ملی و بین‌المللی',
  customerSatisfaction: '۹۸٪',
  phone: '۰۵۱-۳۶۶۶۵۶۰۰',
  directSalesPhone: '۰۹۱۵۱۱۲۶۲۵۸',
  technicalSupportPhone: '۰۹۱۱۵۱۱۶۲۵۸',
  email: 'info@toyooran.com',
  website: 'www.toyooran.com',
  address: 'مشهد، میدان مادر، مجتمع تجاری ادیب، طبقه ۳، واحد ۴۰۶',
  rdAddress: 'گرگان، دانشگاه منابع طبیعی گلستان، ساختمان دفتر تحقیق و توسعه، همکاری‌های علمی و بین‌الملل',
  factoryAddress: 'مشهد، بلوار میثاق، کارخانجات صنعتی طیوران صنعت پویا',
  workingHours: 'شنبه تا چهارشنبه ۸:۰۰ الی ۱۷:۰۰ | پنج‌شنبه‌ها ۸:۰۰ الی ۱۳:۰۰',
  fdaLicense: 'تنها تولیدکننده بشقاب‌های پروانه‌ای تحت لیسانس Butterfly Concepts آمریکا با تاییدیه FDA',
  socialLinks: {
    instagram: 'https://instagram.com/toyooran',
    telegram: 'https://t.me/toyooran',
    whatsapp: 'https://wa.me/989151126258',
    linkedin: 'https://linkedin.com/company/toyooran',
    bale: 'https://ble.ir/toyooran',
    eitaa: 'https://eitaa.com/toyooran',
    rubika: 'https://rubika.ir/toyooran',
  },
  locations: [
    {
      id: 'hq-01',
      title: 'دفتر مرکزی مشهد',
      type: 'headquarter',
      address: 'مشهد، میدان مادر، مجتمع تجاری ادیب، طبقه ۳، واحد ۴۰۶',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.225574526543!2d59.50566!3d36.3263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE5JzM0LjciTiA1OcKwMzAnMjAuNCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s'
    },
    {
      id: 'fact-01',
      title: 'کارخانه صنعتی و خط تولید',
      type: 'factory',
      address: 'مشهد، بلوار میثاق، کارخانجات صنعتی طیوران صنعت پویا',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.125574526543!2d59.45566!3d36.3363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE5JzM0LjciTiA1OcKwMzAnMjAuNCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s'
    },
    {
      id: 'rd-01',
      title: 'دفتر تحقیق و توسعه (R&D)',
      type: 'rd',
      address: 'گرگان، دانشگاه منابع طبیعی گلستان',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.868770258107!2d54.436329!3d36.840243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDUwJzI0LjkiTiA1NMKwMjYnMTAuOCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s'
    },
    {
      id: 'branch-tehran',
      title: 'دفتر نمایندگی تهران',
      type: 'branch',
      address: 'تهران، میدان ونک، خیابان ولیعصر، برج نگار، طبقه ۱۰',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.924843187216!2d51.40871141525946!3d35.75266738017772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e068b55555555%3A0x8e5e6b0f98cd3a21!2sVanak%20Square!5e0!3m2!1sen!2sus!4v1689234567890!5m2!1sen!2sus'
    }
  ]
};
"""

with open("src/data/mockData.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the existing COMPANY_INFO
content = re.sub(r'export const COMPANY_INFO: CompanyInfo = \{.*?\};', company_data, content, flags=re.DOTALL)

with open("src/data/mockData.ts", "w", encoding="utf-8") as f:
    f.write(content)

