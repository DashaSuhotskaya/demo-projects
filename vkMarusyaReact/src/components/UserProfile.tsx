import { useEffect, useState } from "react";
import { getProfile, logout } from "../api/authApi"; 
import type { User } from "../types/user";
import { Loader } from "./Loader/Loader";
import sprite from "../assets/sprite.svg";

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await getProfile();
        setUser(response.data);
        setError(null);
      } catch (err) {
        console.error("Ошибка загрузки профиля:", err);
        setError("Не удалось загрузить данные пользователя.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (err) {
      console.error("Ошибка при выходе из аккаунта:", err);
      alert("Не удалось выйти из аккаунта. Попробуйте еще раз.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error || !user) {
    return (
      <div className="profile__error">
        {error || "Нет данных пользователя."}
      </div>
    );
  }

  const getInitials = (name: string, surname: string) => {
    return `${name[0]}${surname[0]}`.toUpperCase();
  };
  
  return (
    <>
      <div className="userProfile">
        <div className="userProfile__wrapper">
          <div className="userProfile__wrapper-icon">
          <span className="userProfile__initials">{getInitials(user.name, user.surname)}</span>
          </div>
          <div className="userProfile__settings-info">
            <span className="userProfile__small-text">Имя Фамилия</span>
            <span className="userProfile__big-text">
              {user.name} {user.surname}
            </span>
          </div>
        </div>
        <div className="userProfile__wrapper userProfile__wrapper--last">
          <div className="userProfile__wrapper-icon">
            <svg className="userProfile__icon" width="24" height="24">
              <use xlinkHref={`${sprite}#mail`} />
            </svg>
          </div>
          <div className="userProfile__settings-info">
            <span className="userProfile__small-text">Электронная почта</span>
            <span className="userProfile__big-text">{user.email}</span>
          </div>
        </div>
        
        <button 
          className="userProfile__btn" 
          onClick={handleLogout} 
          type="button"
        >
          Выйти из аккаунта
        </button>
      </div>
    </>
  );
}
