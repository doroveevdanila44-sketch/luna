/**
 * Контакты клуба. Источник — docs/CONTENT.md.
 * Ничего не выдумывать: если данных нет, оставлять TODO.
 */

export type Social = {
  readonly id: 'telegram' | 'instagram'
  readonly label: string
  readonly href: string
}

export type Contacts = {
  readonly name: string
  readonly caption: string
  readonly legalName: string
  readonly address: {
    readonly street: string
    readonly area: string
    readonly locality: string
    /** Предложный падеж — для заголовков вида «клуб в …» */
    readonly localityIn: string
    readonly postalCode: string
    /** Полная строка для JSON-LD и подписи под картой */
    readonly full: string
  }
  readonly phone: {
    readonly display: string
    readonly href: string
  }
  /** Режим работы одной строкой — правится в одном месте */
  readonly hours: string
  readonly hoursMachine: {
    readonly opens: string
    readonly closes: string
  }
  readonly payment: string
  readonly geo: {
    readonly lat: number
    readonly lon: number
  }
  readonly maps2gis: string
  readonly rating: {
    readonly value: number
    readonly reviewCount: number
    readonly ratingCount: number
  }
  readonly socials: readonly Social[]
}

export const contacts: Contacts = {
  name: 'Луна',
  caption: 'фитнес-клуб',
  legalName: 'ИП Федоров Виталий Эдуардович',
  address: {
    street: 'ул. Ларина, 22/6, 1 этаж',
    area: 'Северо-восток м-н',
    locality: 'Петропавловск-Камчатский',
    localityIn: 'Петропавловске-Камчатском',
    postalCode: '683042',
    full: 'ул. Ларина, 22/6, 1 этаж, Северо-восток м-н, Петропавловск-Камчатский, 683042',
  },
  phone: {
    display: '+7 984 168-63-93',
    href: 'tel:+79841686393',
  },
  hours: 'Ежедневно с 09:00 до 18:00',
  hoursMachine: {
    opens: '09:00',
    closes: '18:00',
  },
  payment: 'Оплата: карта, наличные, через банк, по QR-коду',
  geo: {
    lat: 53.076498,
    lon: 158.650545,
  },
  maps2gis: 'https://2gis.ru/p_kamchatskiy/firm/70000001105373821',
  rating: {
    value: 4.9,
    reviewCount: 96,
    ratingCount: 111,
  },
  socials: [
    // ВК нет — группу не нашли, иконку из макета убрали (docs/CONTENT.md)
    { id: 'telegram', label: 'Telegram', href: 'https://t.me/lunagymkam41' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/lunagym41/' },
  ],
}
