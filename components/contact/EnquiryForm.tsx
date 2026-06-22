'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Constants ────────────────────────────────────────────────────────────────

// Figma-derived values below the theme token scale
const WORD_COUNTER_SIZE = '0.625rem'      // 10px
const WORD_COUNTER_LINE = '0.75rem'       // 12px

const CHIPS = [
  'WEBSITE', 'DASHBOARD', 'APPLICATION', 'UX AUDIT',
  'DESIGN SYSTEM', 'TALK SESSION', 'SOMETHING ELSE',
]

const BUDGET_OPTIONS = [
  'Under $5k', '$5k–$15k', '$15k–$40k',
  '$40k–$80k', '$80k+', "Let's discuss",
]

const WHEN_OPTIONS = [
  'ASAP', 'In 1–2 weeks', 'In 1–2 months',
  'In 3–6 months', 'Planning ahead',
]

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  services: string[]
  name: string
  email: string
  company: string
  role: string
  budget: string
  when: string
  brief: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ChevronSvg = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M3.5 5.25L7 8.75L10.5 5.25"
      stroke="#A3A3A3"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

const EnquiryForm = () => {
  const [form, setForm] = useState<FormData>({
    services: [],
    name: '', email: '',
    company: '', role: '',
    budget: '', when: '',
    brief: '',
  })
  const [status, setStatus] = useState<Status>('idle')

  const toggleService = (chip: string) =>
    setForm(f => ({
      ...f,
      services: f.services.includes(chip)
        ? f.services.filter(s => s !== chip)
        : [...f.services, chip],
    }))

  const setField =
    (field: keyof Omit<FormData, 'services'>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))

  const wordCount =
    form.brief.trim() === '' ? 0 : form.brief.trim().split(/\s+/).length

  const isValid =
    form.name.trim() !== '' &&
    /\S+@\S+\.\S+/.test(form.email) &&
    (form.budget !== '' || form.when !== '')

  const EMPTY_FORM: FormData = {
    services: [], name: '', email: '',
    company: '', role: '',
    budget: '', when: '',
    brief: '',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || status === 'sending' || status === 'sent') return

    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('send failed')

      setForm(EMPTY_FORM)
      setStatus('sent')
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <Card>
        <DoneIconWrap>
          <svg width="25" height="18" viewBox="0 0 25 18" fill="none">
            <path
              d="M2 9L9.5 16L23 2"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </DoneIconWrap>
        <DoneTextBlock>
          <DoneHeading>Thanks - message sent.</DoneHeading>
          <DoneSub>{`I'll get back to you in under 24h on weekdays. In the meantime, there's a podcast you might like →`}</DoneSub>
        </DoneTextBlock>
      </Card>
    )
  }

  return (
    <Card>
      <TitleBlock>
        <SectionLabel>TELL ME A LITTLE</SectionLabel>
        <SectionHeader before="Start an " muted="enquiry" after="." />
      </TitleBlock>

      <Form onSubmit={handleSubmit} noValidate>

        {/* ── Chip group ────────────────────────────────────────────────── */}
        <ChipGroup>
          <ChipQuestion>WHAT ARE YOU HERE FOR?</ChipQuestion>
          <ChipRow>
            {CHIPS.map(chip => {
              const selected = form.services.includes(chip)
              return (
                <Chip
                  key={chip}
                  type="button"
                  $selected={selected}
                  onClick={() => toggleService(chip)}
                  aria-pressed={selected}
                >
                  {chip}
                </Chip>
              )
            })}
          </ChipRow>
        </ChipGroup>

        {/* ── Name + Email ──────────────────────────────────────────────── */}
        <FieldRow>
          <FieldGroup>
            <FieldLabel htmlFor="contact-name">YOUR NAME</FieldLabel>
            <TextInput
              id="contact-name"
              type="text"
              placeholder="Huges Wattson"
              value={form.name}
              onChange={setField('name')}
              autoComplete="name"
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel htmlFor="contact-email">EMAIL</FieldLabel>
            <TextInput
              id="contact-email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={setField('email')}
              autoComplete="email"
            />
          </FieldGroup>
        </FieldRow>

        {/* ── Company + Role ────────────────────────────────────────────── */}
        <FieldRow $hideOnMobile>
          <FieldGroup>
            <FieldLabel htmlFor="contact-company">COMPANY / TEAM</FieldLabel>
            <TextInput
              id="contact-company"
              type="text"
              placeholder="Studio · Startup · Self"
              value={form.company}
              onChange={setField('company')}
              autoComplete="organization"
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel htmlFor="contact-role">YOUR ROLE</FieldLabel>
            <TextInput
              id="contact-role"
              type="text"
              placeholder="Founder · PM · Designer"
              value={form.role}
              onChange={setField('role')}
              autoComplete="organization-title"
            />
          </FieldGroup>
        </FieldRow>

        {/* ── Budget + When ─────────────────────────────────────────────── */}
        <FieldRow>
          <FieldGroup>
            <FieldLabel htmlFor="contact-budget">BUDGET</FieldLabel>
            <SelectWrap>
              <StyledSelect
                id="contact-budget"
                value={form.budget}
                onChange={setField('budget')}
                $empty={form.budget === ''}
              >
                <option value="" disabled>$15k–$40k</option>
                {BUDGET_OPTIONS.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </StyledSelect>
              <ChevronWrap>
                <ChevronSvg />
              </ChevronWrap>
            </SelectWrap>
          </FieldGroup>
          <FieldGroup>
            <FieldLabel htmlFor="contact-when">WHEN?</FieldLabel>
            <SelectWrap>
              <StyledSelect
                id="contact-when"
                value={form.when}
                onChange={setField('when')}
                $empty={form.when === ''}
              >
                <option value="" disabled>In 1–2 months</option>
                {WHEN_OPTIONS.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </StyledSelect>
              <ChevronWrap>
                <ChevronSvg />
              </ChevronWrap>
            </SelectWrap>
          </FieldGroup>
        </FieldRow>

        {/* ── Brief ─────────────────────────────────────────────────────── */}
        <FieldGroup>
          <FieldLabel htmlFor="contact-brief">A LITTLE BRIEF</FieldLabel>
          <BriefContainer>
            <BriefTextarea
              id="contact-brief"
              placeholder={`What are you building? Who is it for? What's keeping you up at night about it?`}
              value={form.brief}
              onChange={setField('brief')}
            />
            <WordIndicator>
              <WordCount>{wordCount}</WordCount>
              <WordSuffix>{` words. Keep it loose – I'll ask follow-ups.`}</WordSuffix>
            </WordIndicator>
          </BriefContainer>
        </FieldGroup>

        {/* ── Submit ────────────────────────────────────────────────────── */}
        <ResponseRow>
          <SendButton
            type="submit"
            disabled={!isValid || status === 'sending' || status === 'sent'}
          >
            <span>
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent!' : 'Send it'}
            </span>
            <ArrowPill>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 8L8 2M8 2H3M8 2V7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ArrowPill>
          </SendButton>
          {status === 'error' ? (
            <ErrorNotice>Something went wrong — try again or email me directly.</ErrorNotice>
          ) : (
            <ResponseNotice>
              Reply in &lt; 24h on weekdays · I read everything
            </ResponseNotice>
          )}
        </ResponseRow>

      </Form>
    </Card>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;

  ${mq.mobile} {
    border: none;
    border-radius: 0;
    padding: 0;
  }
`

// ── Done state ────────────────────────────────────────────────────────────────

const DoneIconWrap = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background: ${({ theme }) => theme.colors.surface.highlight};
  display: flex;
  align-items: center;
  justify-content: center;
`

const DoneTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
`

const DoneHeading = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 2.25rem;
  }
`

const DoneSub = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  width: 100%;
`

// ── Chip group ────────────────────────────────────────────────────────────────

const ChipGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const ChipQuestion = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
`

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`

const Chip = styled.button<{ $selected: boolean }>`
  border: 1px solid ${({ $selected, theme }) =>
    $selected ? 'transparent' : theme.colors.border.tertiary};
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.surface.inverse : theme.colors.surface.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 10px 12px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.text.inverse : theme.colors.text.secondary};
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease;
`

// ── Field layout ──────────────────────────────────────────────────────────────

const FieldRow = styled.div<{ $hideOnMobile?: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};

  ${mq.mobile} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[6]};
    ${({ $hideOnMobile }) => $hideOnMobile && 'display: none;'}
  }
`

const FieldGroup = styled.div`
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;

  ${mq.mobile} {
    flex: none;
    width: 100%;
  }
`

const FieldLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
`

// ── Text input ────────────────────────────────────────────────────────────────

const TextInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.primary};
  background: transparent;
  width: 100%;
  outline: none;

  &::placeholder {
    font-weight: ${({ theme }) => theme.fontWeights.light};
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.5;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.text.secondary};
  }
`

// ── Select / dropdown ─────────────────────────────────────────────────────────

const SelectWrap = styled.div`
  position: relative;
  width: 100%;
`

const StyledSelect = styled.select<{ $empty: boolean }>`
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  padding-right: 32px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ $empty, theme }) =>
    $empty ? theme.fontWeights.light : theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ $empty, theme }) =>
    $empty ? theme.colors.text.secondary : theme.colors.text.primary};
  opacity: ${({ $empty }) => ($empty ? 0.5 : 1)};
  background: ${({ theme }) => theme.colors.surface.primary};
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 1;
  }
`

const ChevronWrap = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

// ── Brief textarea ────────────────────────────────────────────────────────────

const BriefContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100px;
`

const BriefTextarea = styled.textarea`
  flex: 1;
  min-height: 0;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    font-weight: ${({ theme }) => theme.fontWeights.light};
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.5;
  }
`

const WordIndicator = styled.div`
  display: flex;
  gap: 2px;
  align-items: flex-start;
  flex-shrink: 0;
`

const WordCount = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${WORD_COUNTER_SIZE};
  line-height: ${WORD_COUNTER_LINE};
  color: ${({ theme }) => theme.colors.text.secondary};
  opacity: 0.5;
`

const WordSuffix = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${WORD_COUNTER_SIZE};
  line-height: ${WORD_COUNTER_LINE};
  color: ${({ theme }) => theme.colors.text.secondary};
  opacity: 0.5;
`

// ── Submit row ────────────────────────────────────────────────────────────────

const ResponseRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: wrap;
`

const SendButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.surface.inverse};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.inverse};
  transition: opacity 0.15s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${mq.mobile} {
    padding: 12px 16px;
    font-size: 0.875rem;
    line-height: 1.125rem;
  }
`

const ArrowPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: ${({ theme }) => theme.colors.icon.inverse};
  border-radius: 9px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.surface.inverse};

  ${mq.mobile} {
    width: 16px;
    height: 16px;
    border-radius: 8px;
  }
`

const ResponseNotice = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  opacity: 0.5;
`

const ErrorNotice = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.surface.highlight};
`

export default EnquiryForm
