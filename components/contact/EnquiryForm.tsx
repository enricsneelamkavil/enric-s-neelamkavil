'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Constants ────────────────────────────────────────────────────────────────

const CHIPS = [
  'WEBSITE', 'APPLICATION', 'UX AUDIT', 'DESIGN SYSTEM',
  'TALK SESSION', 'BRAND IDENTITY', 'SOMETHING ELSE',
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
  name: string
  email: string
  budget: string
  when: string
  brief: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value)

// ─── Component ────────────────────────────────────────────────────────────────

const EnquiryForm = () => {
  const [form, setForm] = useState<FormData>({
    name: '', email: '',
    budget: '', when: '',
    brief: '',
  })
  const [selectedChip, setSelectedChip] = useState<string>('')
  const [status, setStatus] = useState<Status>('idle')
  const [emailError, setEmailError] = useState(false)

  const setField =
    (field: keyof FormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(f => ({ ...f, [field]: e.target.value }))

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, email: e.target.value }))
    if (emailError) setEmailError(false)
  }

  const handleEmailBlur = () => {
    setEmailError(form.email.trim() !== '' && !isValidEmail(form.email))
  }

  const isValid =
    form.name.trim() !== '' &&
    form.email.trim() !== '' &&
    form.budget !== ''

  const EMPTY_FORM: FormData = {
    name: '', email: '',
    budget: '', when: '',
    brief: '',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || status === 'sending' || status === 'sent') return

    if (!isValidEmail(form.email)) {
      setEmailError(true)
      return
    }

    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service: selectedChip }),
      })

      if (!res.ok) throw new Error('send failed')

      setForm(EMPTY_FORM)
      setSelectedChip('')
      setEmailError(false)
      setStatus('sent')
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <Card>
      <TitleBlock>
        <SectionLabel>TELL ME A LITTLE</SectionLabel>
        <SectionHeader before="Start an " muted="enquiry" after="." />
      </TitleBlock>

      <Form onSubmit={handleSubmit} noValidate>

        {/* ── Name + Email + Budget + When ──────────────────────────────── */}
        <FieldRow>
          <FieldGroup>
            <FieldLabel htmlFor="contact-name">YOUR NAME <RequiredMark>*</RequiredMark></FieldLabel>
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
            <FieldLabel htmlFor="contact-email">EMAIL <RequiredMark>*</RequiredMark></FieldLabel>
            <TextInput
              id="contact-email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              autoComplete="email"
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel htmlFor="contact-budget">BUDGET <RequiredMark>*</RequiredMark></FieldLabel>
            <SelectWrap>
              <StyledSelect
                id="contact-budget"
                value={form.budget}
                onChange={setField('budget')}
                $empty={form.budget === ''}
              >
                <option value="" disabled hidden>Select Budget</option>
                {BUDGET_OPTIONS.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </StyledSelect>
              <ChevronIcon src="/icons/cheveron-down.svg" width={16} height={16} alt="" aria-hidden />
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
                <option value="" disabled hidden>Select Timeline</option>
                {WHEN_OPTIONS.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </StyledSelect>
              <ChevronIcon src="/icons/cheveron-down.svg" width={16} height={16} alt="" aria-hidden />
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
          </BriefContainer>
        </FieldGroup>

        {/* ── Chip group ────────────────────────────────────────────────── */}
        <ChipGroup>
          <ChipQuestion>WHAT ARE YOU HERE FOR?</ChipQuestion>
          <ChipRow>
            {CHIPS.map(chip => (
              <Chip
                key={chip}
                type="button"
                $selected={chip === selectedChip}
                onClick={() => setSelectedChip(chip)}
                aria-pressed={chip === selectedChip}
              >
                {chip}
              </Chip>
            ))}
          </ChipRow>
        </ChipGroup>

        {/* ── Submit ────────────────────────────────────────────────────── */}
        <ResponseRow>
          <SendButton
            type="submit"
            disabled={!isValid || status === 'sending' || status === 'sent'}
          >
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent' : 'Send it'}
            {status === 'sent' && (
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                <path
                  d="M1 5L4.5 8.5L11 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </SendButton>
          {status === 'error' ? (
            <ErrorNotice>Something went wrong — try again or email me directly.</ErrorNotice>
          ) : status === 'sent' ? (
            <SentNotice>{`Thanks! I'll get back to you in under 24h on weekdays.`}</SentNotice>
          ) : (
            <Notice $error={emailError}>
              {emailError
                ? "Hmm, that email doesn't look right — double check it?"
                : <>Reply in &lt; 24h on weekdays · I read everything</>}
            </Notice>
          )}
        </ResponseRow>

      </Form>
    </Card>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
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
    $selected ? theme.colors.surface.inverse : 'transparent'};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 8px 16px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  text-transform: uppercase;
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.text.inverse : theme.colors.text.secondary};
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease;
`

// ── Field layout ──────────────────────────────────────────────────────────────

const FieldRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};

  ${mq.mobile} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[6]};
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

const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.text.highlight};
  margin-left: 2px;
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
    $empty ? theme.colors.text.tertiary : theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.surface.primary};
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.text.secondary};
  }
`

const ChevronIcon = styled.img`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 16px;
  height: 16px;
  filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(87%);
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

const Notice = styled.p<{ $error: boolean }>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ $error, theme }) =>
    $error ? theme.colors.text.highlight : theme.colors.text.secondary};
  opacity: ${({ $error }) => ($error ? 1 : 0.5)};
  transition: color 0.15s ease, opacity 0.15s ease;
`

// "Color highlight" per Figma's annotation on this text node after submit.
const SentNotice = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.highlight};
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
