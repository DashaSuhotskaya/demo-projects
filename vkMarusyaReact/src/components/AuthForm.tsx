import { useState, type FormEvent } from "react";
import { login, register } from "../api/authApi";
import sprite from "../assets/sprite.svg";
import { RegistrationSuccessView } from "./RegistrationSuccessView";
import { useFavorites } from "./favoritesContext";
import { useAuth } from "./AuthContext";

interface AuthFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

type FormMode = "login" | "register";

export function AuthForm({ onClose, onSuccess }: AuthFormProps) {
  const { loginUser } = useAuth();
  const { fetchFavorites } = useFavorites();
  const [mode, setMode] = useState<FormMode>("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  

  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean> = {};

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = true;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = true;
    }

    if (mode === "register") {
      if (!formData.name?.trim()) newErrors.name = true;
      if (!formData.surname?.trim()) newErrors.surname = true;
      if (!confirmPassword || formData.password !== confirmPassword) {
        newErrors.confirmPassword = true;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (mode === "login") {
        await login({ email: formData.email, password: formData.password });
        await loginUser(); 
        await fetchFavorites(); 
        onSuccess?.();
        onClose();
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name || undefined,
          surname: formData.surname || undefined,
        });
        setIsRegistrationSuccess(true); 
      }
    } catch (error: any) {
      setErrors({
        email: true,
        password: true,
        ...(mode === "register" && { name: true, surname: true, confirmPassword: true })
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }));
    };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: false }));
  };

  const handleSuccessLoginClick = () => {
    setMode("login");
    setIsRegistrationSuccess(false);
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setErrors({});
    setFormData({ email: "", password: "", name: "", surname: "" });
    setConfirmPassword("");
  };

  return (
    <div className="authForm" onClick={onClose}>
      {isRegistrationSuccess ? (
        <RegistrationSuccessView 
          onLoginClick={handleSuccessLoginClick} 
          onClose={onClose}
        />
      ) : (
      <div className="authForm__wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="authForm__btn authForm__btn--close" onClick={onClose}>
          <svg width="24" height="24">
            <use xlinkHref={`${sprite}#close-icon`} />
          </svg>
        </button>

        <svg className="authForm__icon-logo" width="133" height="30">
          <use xlinkHref={`${sprite}#logo-black`} />
        </svg>
        
        <h2 className="authForm__title">
          {mode === "login" ? "" : "Регистрация"}
        </h2>

        <form className="authForm__inner" onSubmit={handleSubmit}>
          <div className="authForm__fields">
            <label className="authForm__label">
              <svg className={`authForm__icon-field ${errors.email ? "authForm__icon-field--error" : ""}`} width="24" height="24">
                <use xlinkHref={`${sprite}#mail`} />
              </svg>
              <input
                type="email"
                placeholder="Электронная почта"
                className={`authForm__field ${errors.email ? "authForm__field--error" : ""}`}
                value={formData.email}
                onChange={handleInputChange("email")}
                disabled={isLoading}
              />
            </label>

            {mode === "register" && (
              <>
                <label className="authForm__label">
                  <svg className={`authForm__icon-field ${errors.name ? "authForm__icon-field--error" : ""}`} width="24" height="24">
                    <use xlinkHref={`${sprite}#user-icon`} />
                  </svg>
                  <input
                    type="text"
                    placeholder="Имя"
                    className={`authForm__field ${errors.name ? "authForm__field--error" : ""}`}
                    value={formData.name}
                    onChange={handleInputChange("name")}
                    disabled={isLoading}
                  />
                </label>
                
                <label className="authForm__label">
                  <svg className={`authForm__icon-field ${errors.surname ? "authForm__icon-field--error" : ""}`} width="24" height="24">
                    <use xlinkHref={`${sprite}#user-icon`} />
                  </svg>
                  <input
                    type="text"
                    placeholder="Фамилия"
                    className={`authForm__field ${errors.surname ? "authForm__field--error" : ""}`}
                    value={formData.surname}
                    onChange={handleInputChange("surname")}
                    disabled={isLoading}
                  />
                </label>
              </>
            )}

            <label className="authForm__label">
              <svg className={`authForm__icon-field ${errors.password ? "authForm__icon-field--error" : ""}`} width="24" height="24">
                <use xlinkHref={`${sprite}#key`} />
              </svg>
              <input
                type="password"
                placeholder="Пароль"
                className={`authForm__field ${errors.password ? "authForm__field--error" : ""}`}
                value={formData.password}
                onChange={handleInputChange("password")}
                disabled={isLoading}
              />
            </label>

            {mode === "register" && (
              <label className="authForm__label">
                <svg className={`authForm__icon-field ${errors.confirmPassword ? "authForm__icon-field--error" : ""}`} width="24" height="24">
                  <use xlinkHref={`${sprite}#key`} />
                </svg>
                <input
                  type="password"
                  placeholder="Подтвердите пароль"
                  className={`authForm__field ${errors.confirmPassword ? "authForm__field--error" : ""}`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  disabled={isLoading}
                />
              </label>
            )}
          </div>

          <button
            type="submit"
            className="authForm__btn authForm__btn--login"
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : mode === "login" ? "Войти" : "Создать аккаунт"}
          </button>
        </form>

        <button
          className="authForm__btn authForm__btn--last"
          onClick={toggleMode}
          type="button"
          disabled={isLoading}
        >
          {mode === "login" ? "Регистрация" : "У меня есть пароль"}
        </button>
      </div>)}
    </div>
  );
}