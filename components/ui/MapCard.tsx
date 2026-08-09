import { contacts } from '@/data/contacts'
import { ui } from '@/data/home'

type Props = {
  className?: string
}

/**
 * Стилизованный тёмный фрагмент карты — рисуем сами, без внешних тайлов
 * и ключей API. По клику открывается карточка 2ГИС в новой вкладке.
 * Когда появится бюджет на карты — компонент меняется целиком, снаружи ничего.
 */
export function MapCard({ className = '' }: Props) {
  return (
    <a
      href={contacts.maps2gis}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={ui.mapAria}
      className={`group relative block overflow-hidden rounded-card border border-line bg-panel-2 transition-colors hover:border-green/50 ${className}`}
    >
      <svg
        viewBox="0 0 320 190"
        className="h-full w-full"
        role="img"
        aria-label={`${contacts.name}, ${contacts.address.street}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="320" height="190" fill="var(--panel-2)" />

        {/* кварталы */}
        <g fill="#171a15">
          <rect x="12" y="14" width="86" height="52" rx="3" />
          <rect x="112" y="14" width="64" height="52" rx="3" />
          <rect x="192" y="8" width="52" height="34" rx="3" />
          <rect x="258" y="18" width="52" height="48" rx="3" />
          <rect x="12" y="82" width="70" height="44" rx="3" />
          <rect x="96" y="82" width="96" height="44" rx="3" />
          <rect x="206" y="82" width="104" height="44" rx="3" />
          <rect x="12" y="142" width="120" height="40" rx="3" />
          <rect x="148" y="142" width="72" height="40" rx="3" />
          <rect x="236" y="142" width="74" height="40" rx="3" />
        </g>

        {/* дороги */}
        <g stroke="#24281f" strokeWidth="3" strokeLinecap="round">
          <path d="M0 74h320" />
          <path d="M0 134h320" />
          <path d="M104 0v190" />
          <path d="M198 0v190" />
        </g>
        <g stroke="#2f3428" strokeWidth="1.2">
          <path d="M0 40h100" />
          <path d="M250 0v74" />
          <path d="M60 74v60" />
        </g>

        {/* метка клуба */}
        <g transform="translate(196 96)">
          <path
            d="M12 0a12 12 0 0 0-12 12c0 8.8 12 22 12 22s12-13.2 12-22A12 12 0 0 0 12 0z"
            fill="var(--green)"
          />
          <circle cx="12" cy="12" r="4.6" fill="var(--panel-2)" />
        </g>
        <text
          x="228"
          y="112"
          fill="var(--text)"
          fontSize="13"
          fontWeight="700"
          letterSpacing="1.6"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {contacts.name.toUpperCase()}
        </text>
      </svg>
    </a>
  )
}
