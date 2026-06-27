/**
 * socials.js — Project NOVA
 *
 * Social media and contact links.
 * Used by: Contact section, Footer, Hero CTA, Navbar icon buttons.
 *
 * Icons use react-icons/fi (Feather Icons) for a clean, consistent style.
 * PRD Reference: PRD.md §11 — Contact Section
 */

import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';


/**
 * Primary social links.
 * Displayed in: Contact section, Footer, potentially Navbar.
 *
 * @property {string}          id          - Unique identifier
 * @property {string}          label       - Display text / tooltip
 * @property {string}          href        - Full URL or mailto:
 * @property {React.Component} icon        - React Icons component
 * @property {string}          ariaLabel   - Accessible label for screen readers
 * @property {boolean}         external    - Opens in new tab if true
 */
export const SOCIAL_LINKS = [
  {
    id:        'github',
    label:     'GitHub',
    href:      'https://github.com/abhijeet-kushwaha',
    icon:      FiGithub,
    ariaLabel: "Visit Abhijeet's GitHub profile",
    external:  true,
  },
  {
    id:        'linkedin',
    label:     'LinkedIn',
    href:      'https://www.linkedin.com/in/abhijeet-kushwaha-876454330/',
    icon:      FiLinkedin,
    ariaLabel: 'Connect with Abhijeet on LinkedIn',
    external:  true,
  },
  {
    id:        'email',
    label:     'Email',
    href:      'mailto:kushwahaabhijeet2508@gmail.com',
    icon:      FiMail,
    ariaLabel: 'Send Abhijeet an email',
    external:  false,
  },
];


/**
 * Quick contact info.
 * Used in the Contact section alongside the form.
 *
 * @property {string} type  - 'email' | 'location' | 'availability'
 * @property {string} label - Field label
 * @property {string} value - Display value
 * @property {string} [href] - Optional link
 */
export const CONTACT_INFO = [
  {
    type:  'email',
    label: 'Email',
    value: 'kushwahaabhijeet2508@gmail.com',
    href:  'mailto:kushwahaabhijeet2508@gmail.com',
  },
  {
    type:  'location',
    label: 'Location',
    value: 'Gorakhpur, Uttar Pradesh, India',
    href:  null,
  },
  {
    type:  'availability',
    label: 'Status',
    value: 'Open to Opportunities',
    href:  null,
  },
];
