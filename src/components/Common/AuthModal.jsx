import React, { useState, useEffect, useCallback } from 'react';
import {
  X, LogIn, UserPlus, Eye, EyeOff, Loader2,
  ShieldCheck, User, Sprout, Mail, Lock,
  Phone, Home, Warehouse, CheckCircle2, AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { sendOtp, resetPassword } from '@/api/authApi';

function calcStrength(pwd) {
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return Math.min(score, 4);
}

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['', '#EF4444', '#F59E0B', '#3B82F6', '#22C55E'];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone) {
  if (!phone) return true;
  return /^(0|\+84)[0-9]{9}$/.test(phone.replace(/\s/g, ''));
}

function FormInput({
  label, type = 'text', placeholder, value, onChange,
  icon: Icon, error, required, autoComplete,
  rightEl, hint,
}) {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;
  const hasValue = !!value;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{
        fontSize: '12px', fontWeight: 700, color: hasError ? '#D92D20' : '#344054',
        display: 'flex', alignItems: 'center', gap: '4px',
      }}>
        {Icon && <Icon size={13} />}
        {label}
        {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>

      <div style={{ position: 'relative' }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: rightEl ? '10px 42px 10px 12px' : '10px 12px',
            borderRadius: '10px',
            border: `1.5px solid ${hasError ? '#FDA29B' : focused ? '#1FA855' : hasValue ? '#D0D5DD' : '#E4E7EC'}`,
            fontSize: '14px',
            outline: 'none',
            background: hasError ? '#FFF9F8' : '#FAFAFA',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            color: '#101828',
            transition: 'border-color 0.15s, box-shadow 0.15s',
            boxShadow: focused ? `0 0 0 3px ${hasError ? 'rgba(217,45,32,0.12)' : 'rgba(31,168,85,0.14)'}` : 'none',
          }}
        />
        {rightEl && (
          <div style={{
            position: 'absolute', right: '12px', top: '50%',
            transform: 'translateY(-50%)',
          }}>
            {rightEl}
          </div>
        )}
      </div>

      {hasError && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#D92D20', fontWeight: 500 }}>
          <AlertCircle size={12} />
          {error}
        </div>
      )}
      {hint && !hasError && (
        <div style={{ fontSize: '11px', color: '#98A2B3' }}>{hint}</div>
      )}
    </div>
  );
}

function StrengthBar({ password }) {
  const strength = calcStrength(password);
  if (!password) return null;
  return (
    <div style={{ marginTop: '2px' }}>
      <div style={{ display: 'flex', gap: '3px', marginBottom: '3px' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{
            flex: 1, height: '4px', borderRadius: '99px',
            background: i <= strength ? STRENGTH_COLORS[strength] : '#E4E7EC',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>
      {strength > 0 && (
        <div style={{ fontSize: '11px', color: STRENGTH_COLORS[strength], fontWeight: 600 }}>
          Password strength: {STRENGTH_LABELS[strength]}
        </div>
      )}
    </div>
  );
}

const ROLES = [
  { value: 'CUSTOMER', emoji: '🛒', label: 'Shopper / Consumer', sub: 'Reserve harvest & pickup' },
  { value: 'FARMER', emoji: '🌾', label: 'Regional Grower', sub: 'Manage stall quotas & farm' },
];

function RoleSelector({ value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '12px', fontWeight: 700, color: '#344054', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <User size={13} />
        Account Type <span style={{ color: '#EF4444' }}>*</span>
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {ROLES.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => onChange(r.value)}
            style={{
              padding: '10px 8px',
              borderRadius: '12px',
              border: value === r.value ? '2px solid #1FA855' : '1.5px solid #E4E7EC',
              background: value === r.value ? '#F0FDF4' : '#FAFAFA',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.15s',
              boxShadow: value === r.value ? '0 0 0 3px rgba(31,168,85,0.12)' : 'none',
            }}
          >
            <div style={{ fontSize: '20px', lineHeight: 1, marginBottom: '3px' }}>{r.emoji}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: value === r.value ? '#1FA855' : '#344054' }}>{r.label}</div>
            <div style={{ fontSize: '10px', color: '#98A2B3', marginTop: '1px' }}>{r.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function SuccessScreen({ type, name, onClose }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '40px 28px', textAlign: 'center', gap: '12px',
    }}>
      <div style={{
        width: '72px', height: '72px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #22C55E, #16a34a)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(34,197,94,0.35)',
        animation: 'popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        <CheckCircle2 size={36} color="#fff" strokeWidth={2.5} />
      </div>
      <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#101828' }}>
        {type === 'login' ? 'Welcome Back! 👋' : 'Account Created Successfully! 🎉'}
      </h3>
      <p style={{ margin: 0, fontSize: '14px', color: '#475467', lineHeight: 1.5 }}>
        {type === 'login'
          ? `Welcome back, ${name || 'User'}. Enjoy your farm-fresh shopping experience.`
          : `Welcome to MarketLink, ${name || 'User'}!\nYour account is now ready for pre-orders.`}
      </p>
      <button
        onClick={onClose}
        style={{
          marginTop: '8px',
          background: '#1FA855', color: '#fff', border: 'none',
          borderRadius: '12px', padding: '12px 32px',
          fontSize: '14px', fontWeight: 700, cursor: 'pointer',
        }}
      >
        Start Exploring →
      </button>
    </div>
  );
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }) {
  const { login, register, isLoading, clearError } = useAuth();

  const [tab, setTab]       = useState(defaultTab);
  const [step, setStep]     = useState(1);
  const [done, setDone]     = useState(null);
  const [doneName, setDoneName] = useState('');

  const [loginEmail, setLoginEmail]   = useState('');
  const [loginPwd,   setLoginPwd]     = useState('');
  const [showLoginPwd, setShowLoginPwd] = useState(false);

  const [reg, setReg] = useState({
    fullName: '', email: '', password: '', confirmPwd: '',
    phoneNumber: '', role: 'CUSTOMER',
    farmName: '', farmAddress: '', deliveryAddress: '',
  });
  const [showRegPwd, setShowRegPwd]     = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const [errs, setErrs] = useState({});
  const [apiError, setApiError] = useState('');

  // Password Reset State
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [resetNewPwd, setResetNewPwd] = useState('');
  const [resetStep, setResetStep] = useState(1);
  const [isResetting, setIsResetting] = useState(false);
  const [resetMsg, setResetMsg] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setApiError('Vui lòng nhập Email hoặc Số điện thoại.');
      return;
    }
    setIsResetting(true);
    setApiError('');
    try {
      const res = await sendOtp(resetEmail, 'PASSWORD_RESET');
      setResetStep(2);
      setResetMsg(res?.message || 'Mã OTP đã được gửi. Vui lòng kiểm tra email/SMS.');
    } catch (err) {
      setApiError(err.message || 'Không thể gửi mã OTP.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    if (!resetCode || !resetNewPwd) {
      setApiError('Vui lòng nhập đầy đủ mã OTP và mật khẩu mới.');
      return;
    }
    setIsResetting(true);
    setApiError('');
    try {
      await resetPassword(resetEmail, resetCode, resetNewPwd);
      setDone('reset');
      setDoneName(resetEmail);
    } catch (err) {
      setApiError(err.message || 'Đặt lại mật khẩu không thành công.');
    } finally {
      setIsResetting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTab(defaultTab);
      setStep(1);
      setDone(null);
      setErrs({});
      setApiError('');
      if (clearError) clearError();
    }
  }, [isOpen, defaultTab, clearError]);

  const switchTab = (t) => {
    setTab(t); setStep(1);
    setErrs({}); setApiError('');
    if (clearError) clearError();
  };

  const validateLogin = () => {
    const e = {};
    if (!loginEmail) e.email = 'Please enter your email.';
    else if (!isValidEmail(loginEmail)) e.email = 'Please enter a valid email address.';
    if (!loginPwd) e.password = 'Please enter your password.';
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const validateStep1 = () => {
    const e = {};
    if (!reg.fullName.trim()) e.fullName = 'Please enter your full name.';
    if (!reg.email) e.email = 'Please enter your email.';
    else if (!isValidEmail(reg.email)) e.email = 'Please enter a valid email address.';
    if (!reg.password) e.password = 'Please enter a password.';
    else if (reg.password.length < 6) e.password = 'Password must be at least 6 characters.';
    if (!reg.confirmPwd) e.confirmPwd = 'Please confirm your password.';
    else if (reg.confirmPwd !== reg.password) e.confirmPwd = 'Passwords do not match.';
    if (reg.phoneNumber && !isValidPhone(reg.phoneNumber)) e.phoneNumber = 'Invalid phone number format.';
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validateLogin()) return;
    try {
      const res = await login(loginEmail.trim(), loginPwd);
      setDoneName(res?.fullName || loginEmail);
      setDone('login');
      setTimeout(() => { setDone(null); onClose(); }, 1800);
    } catch (err) {
      setApiError(err.message || 'Incorrect email or password.');
    }
  }, [login, loginEmail, loginPwd, onClose]);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setApiError('');
    try {
      const payload = {
        fullName: reg.fullName.trim(),
        email: reg.email.trim(),
        password: reg.password,
        phoneNumber: reg.phoneNumber.trim() || undefined,
        role: reg.role,
        ...(reg.role === 'FARMER' ? {
          farmName: reg.farmName.trim() || undefined,
          farmAddress: reg.farmAddress.trim() || undefined,
        } : {
          deliveryAddress: reg.deliveryAddress.trim() || undefined,
        }),
      };
      const res = await register(payload);
      setDoneName(res?.fullName || reg.fullName);
      setDone('register');
      setTimeout(() => { setDone(null); onClose(); }, 2000);
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
    }
  };

  const setField = (field) => (e) => {
    setReg((prev) => ({ ...prev, [field]: e.target.value }));
    if (errs[field]) setErrs((prev) => ({ ...prev, [field]: '' }));
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(16, 24, 40, 0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
          animation: 'fadeIn 0.2s ease',
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '460px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.1)',
            overflow: 'hidden',
            maxHeight: '94vh',
            overflowY: 'auto',
            animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            position: 'relative',
          }}
        >
          {done && <SuccessScreen type={done} name={doneName} onClose={onClose} />}

          {!done && (
            <>
              <div style={{
                background: 'linear-gradient(135deg, #166534 0%, #1FA855 60%, #22c55e 100%)',
                padding: '22px 24px 18px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <button onClick={onClose} style={{
                  position: 'absolute', top: '14px', right: '14px',
                  background: 'rgba(255,255,255,0.18)', border: 'none', borderRadius: '8px',
                  width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#fff', transition: 'background 0.15s',
                }}>
                  <X size={17} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '32px', lineHeight: 1 }}>🌿</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: '20px', lineHeight: 1.1 }}>MarketLink</div>
                    <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', marginTop: '2px' }}>
                      Direct Farm-to-Table Marketplace
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex', borderBottom: '1px solid #F2F4F7',
                background: '#FAFAFA',
              }}>
                {[
                  { id: 'login',    label: 'Sign In',        icon: LogIn },
                  { id: 'register', label: 'Create Account', icon: UserPlus },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => switchTab(id)}
                    style={{
                      flex: 1, padding: '13px', border: 'none',
                      background: tab === id ? '#fff' : 'transparent',
                      borderBottom: `2px solid ${tab === id ? '#1FA855' : 'transparent'}`,
                      color: tab === id ? '#1FA855' : '#667085',
                      fontWeight: tab === id ? 700 : 500,
                      fontSize: '14px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                ))}
              </div>

              <div style={{ padding: '22px 24px 28px' }}>
                {apiError && (
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: '8px',
                    background: '#FEF3F2', border: '1px solid #FECDCA',
                    color: '#D92D20', padding: '10px 14px',
                    borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                    marginBottom: '16px',
                  }}>
                    <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
                    <span>{apiError}</span>
                  </div>
                )}

                {tab === 'login' && (
                  <form onSubmit={handleLogin} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <FormInput
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => { setLoginEmail(e.target.value); setErrs((p) => ({ ...p, email: '' })); }}
                      icon={Mail}
                      error={errs.email}
                      required
                      autoComplete="email"
                    />

                    <FormInput
                      label="Password"
                      type={showLoginPwd ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginPwd}
                      onChange={(e) => { setLoginPwd(e.target.value); setErrs((p) => ({ ...p, password: '' })); }}
                      icon={Lock}
                      error={errs.password}
                      required
                      autoComplete="current-password"
                      rightEl={
                        <button type="button" onClick={() => setShowLoginPwd(!showLoginPwd)} style={{ background: 'none', border: 'none', color: '#98A2B3', cursor: 'pointer' }}>
                          {showLoginPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      }
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-6px' }}>
                      <button
                        type="button"
                        onClick={() => switchTab('reset')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#2563EB',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      >
                        Quên mật khẩu? (Đặt lại qua OTP)
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      style={{
                        background: isLoading
                          ? 'linear-gradient(135deg,#86efac,#4ade80)'
                          : 'linear-gradient(135deg,#1FA855,#166534)',
                        color: '#fff', border: 'none', borderRadius: '12px',
                        padding: '13px', fontSize: '15px', fontWeight: 700,
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        boxShadow: isLoading ? 'none' : '0 4px 14px rgba(31,168,85,0.35)',
                        transition: 'all 0.2s', marginTop: '4px',
                      }}
                    >
                      {isLoading
                        ? <><Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> Signing in...</>
                        : <><LogIn size={18} /> Sign In</>
                      }
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '13px', color: '#667085', margin: 0 }}>
                      New to MarketLink?{' '}
                      <button type="button" onClick={() => switchTab('register')}
                        style={{ background: 'none', border: 'none', color: '#1FA855', fontWeight: 700, cursor: 'pointer', padding: 0, fontSize: '13px' }}>
                        Create an account →
                      </button>
                    </p>
                  </form>
                )}

                {tab === 'reset' && (
                  <form onSubmit={resetStep === 1 ? handleSendOtp : handleConfirmReset} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#101828' }}>
                      {resetStep === 1 ? 'Khôi Phục Mật Khẩu qua OTP' : 'Xác Minh OTP & Đặt Mật Khẩu Mới'}
                    </div>

                    {resetMsg && (
                      <div style={{ background: '#F0FDF4', color: '#166534', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 600 }}>
                        {resetMsg}
                      </div>
                    )}

                    {resetStep === 1 ? (
                      <>
                        <FormInput
                          label="Email hoặc Số Điện Thoại nhận mã"
                          type="text"
                          placeholder="farmer1@marketlink.com"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          icon={Mail}
                          required
                        />
                        <button
                          type="submit"
                          disabled={isResetting}
                          style={{
                            background: '#1FA855',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px',
                            fontSize: '14px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {isResetting ? 'Đang gửi mã...' : 'Gửi Mã Xác Minh OTP →'}
                        </button>
                      </>
                    ) : (
                      <>
                        <FormInput
                          label="Mã OTP 6 số"
                          type="text"
                          placeholder="Ví dụ: 123456"
                          value={resetCode}
                          onChange={(e) => setResetCode(e.target.value)}
                          icon={Lock}
                          required
                        />
                        <FormInput
                          label="Mật Khẩu Mới"
                          type="password"
                          placeholder="Nhập ít nhất 6 ký tự..."
                          value={resetNewPwd}
                          onChange={(e) => setResetNewPwd(e.target.value)}
                          icon={Lock}
                          required
                        />
                        <button
                          type="submit"
                          disabled={isResetting}
                          style={{
                            background: '#1FA855',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px',
                            fontSize: '14px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {isResetting ? 'Đang cập nhật...' : 'Xác Nhận Đổi Mật Khẩu'}
                        </button>
                      </>
                    )}

                    <p style={{ textAlign: 'center', fontSize: '13px', color: '#667085', margin: 0 }}>
                      <button type="button" onClick={() => switchTab('login')}
                        style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 700, cursor: 'pointer', padding: 0, fontSize: '13px' }}>
                        ← Quay lại Đăng Nhập
                      </button>
                    </p>
                  </form>
                )}

                {tab === 'register' && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                      {[1, 2].map((s) => (
                        <React.Fragment key={s}>
                          <div style={{
                            width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                            background: step >= s ? '#1FA855' : '#E4E7EC',
                            color: step >= s ? '#fff' : '#98A2B3',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', fontWeight: 700, transition: 'all 0.3s',
                          }}>
                            {step > s ? <CheckCircle2 size={14} /> : s}
                          </div>
                          {s < 2 && (
                            <div style={{
                              flex: 1, height: '2px', borderRadius: '99px',
                              background: step > s ? '#1FA855' : '#E4E7EC', transition: 'background 0.3s',
                            }} />
                          )}
                        </React.Fragment>
                      ))}
                      <div style={{ marginLeft: '4px', fontSize: '12px', color: '#667085', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {step === 1 ? 'Credentials' : 'Role & Details'}
                      </div>
                    </div>

                    {step === 1 && (
                      <form onSubmit={handleNextStep} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                        <FormInput
                          label="Full Name"
                          placeholder="e.g. John Doe"
                          value={reg.fullName}
                          onChange={setField('fullName')}
                          icon={User}
                          error={errs.fullName}
                          required
                          autoComplete="name"
                        />

                        <FormInput
                          label="Email Address"
                          type="email"
                          placeholder="you@example.com"
                          value={reg.email}
                          onChange={setField('email')}
                          icon={Mail}
                          error={errs.email}
                          required
                          autoComplete="email"
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <FormInput
                            label="Password"
                            type={showRegPwd ? 'text' : 'password'}
                            placeholder="Min. 6 characters"
                            value={reg.password}
                            onChange={setField('password')}
                            icon={Lock}
                            error={errs.password}
                            required
                            autoComplete="new-password"
                            rightEl={
                              <button type="button" onClick={() => setShowRegPwd(!showRegPwd)} style={{ background: 'none', border: 'none', color: '#98A2B3', cursor: 'pointer' }}>
                                {showRegPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            }
                          />
                          <StrengthBar password={reg.password} />
                        </div>

                        <FormInput
                          label="Confirm Password"
                          type={showConfirmPwd ? 'text' : 'password'}
                          placeholder="Re-type password"
                          value={reg.confirmPwd}
                          onChange={setField('confirmPwd')}
                          icon={Lock}
                          error={errs.confirmPwd}
                          required
                          autoComplete="new-password"
                          rightEl={
                            <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} style={{ background: 'none', border: 'none', color: '#98A2B3', cursor: 'pointer' }}>
                              {showConfirmPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          }
                        />

                        <FormInput
                          label="Phone Number"
                          type="tel"
                          placeholder="0912 345 678"
                          value={reg.phoneNumber}
                          onChange={setField('phoneNumber')}
                          icon={Phone}
                          error={errs.phoneNumber}
                          hint="Optional"
                          autoComplete="tel"
                        />

                        <button type="submit" style={{
                          background: 'linear-gradient(135deg,#1FA855,#166534)',
                          color: '#fff', border: 'none', borderRadius: '12px',
                          padding: '13px', fontSize: '15px', fontWeight: 700,
                          cursor: 'pointer', marginTop: '4px',
                          boxShadow: '0 4px 14px rgba(31,168,85,0.3)',
                        }}>
                          Continue →
                        </button>

                        <p style={{ textAlign: 'center', fontSize: '13px', color: '#667085', margin: 0 }}>
                          Already have an account?{' '}
                          <button type="button" onClick={() => switchTab('login')}
                            style={{ background: 'none', border: 'none', color: '#1FA855', fontWeight: 700, cursor: 'pointer', padding: 0, fontSize: '13px' }}>
                            Sign In
                          </button>
                        </p>
                      </form>
                    )}

                    {step === 2 && (
                      <form onSubmit={handleRegister} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <RoleSelector value={reg.role} onChange={(v) => setReg((p) => ({ ...p, role: v }))} />

                        {reg.role === 'FARMER' && (
                          <>
                            <FormInput
                              label="Farm / Cooperative Name"
                              placeholder="e.g. Can Tho Eco Farm"
                              value={reg.farmName}
                              onChange={setField('farmName')}
                              icon={Warehouse}
                              hint="Optional"
                            />
                            <FormInput
                              label="Farm Address"
                              placeholder="e.g. Phong Dien, Can Tho"
                              value={reg.farmAddress}
                              onChange={setField('farmAddress')}
                              icon={Home}
                              hint="Optional"
                            />
                          </>
                        )}

                        {reg.role === 'CUSTOMER' && (
                          <FormInput
                            label="Default Delivery Address"
                            placeholder="e.g. 123 Tran Hung Dao, Ninh Kieu"
                            value={reg.deliveryAddress}
                            onChange={setField('deliveryAddress')}
                            icon={Home}
                            hint="Optional, can be modified later"
                          />
                        )}

                        <div style={{
                          background: '#F8FCF9', border: '1px solid rgba(31,168,85,0.2)',
                          borderRadius: '10px', padding: '10px 14px', fontSize: '12px',
                          color: '#344054', lineHeight: 1.7,
                        }}>
                          <div style={{ fontWeight: 700, color: '#101828', marginBottom: '2px' }}>📋 Summary:</div>
                          <div>👤 <strong>{reg.fullName}</strong></div>
                          <div>📧 {reg.email}</div>
                          {reg.phoneNumber && <div>📱 {reg.phoneNumber}</div>}
                          <div>🏷️ Role: <strong>{ROLES.find(r => r.value === reg.role)?.label}</strong></div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            style={{
                              flex: '0 0 auto',
                              background: '#F2F4F7', color: '#344054',
                              border: 'none', borderRadius: '12px',
                              padding: '13px 18px', fontSize: '14px', fontWeight: 600,
                              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
                            }}
                          >
                            <ArrowLeft size={15} /> Back
                          </button>

                          <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                              flex: 1,
                              background: isLoading
                                ? 'linear-gradient(135deg,#86efac,#4ade80)'
                                : 'linear-gradient(135deg,#1FA855,#166534)',
                              color: '#fff', border: 'none', borderRadius: '12px',
                              padding: '13px', fontSize: '15px', fontWeight: 700,
                              cursor: isLoading ? 'not-allowed' : 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                              boxShadow: isLoading ? 'none' : '0 4px 14px rgba(31,168,85,0.3)',
                            }}
                          >
                            {isLoading
                              ? <><Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> Creating account...</>
                              : <><UserPlus size={17} /> Complete Registration</>
                            }
                          </button>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes popIn   { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </>
  );
}
