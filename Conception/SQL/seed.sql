-- SEED DATA
BEGIN;
-- Utilisateurs
INSERT INTO users (role, first_name, last_name, email, password_hash, phone_number) VALUES
('coach', 'John', 'Doe', 'john.doe@example.com', 'hashed_password_1', '1234567890'),
('coach', 'Emily', 'Brown', 'emily.brown@example.com', 'hashed_password_2', '2345678901'),
('client', 'Jane', 'Smith', 'jane.smith@example.com', 'hashed_password_3', '0987654321'),
('client', 'Alex', 'Johnson', 'alex.johnson@example.com', 'hashed_password_4', '5678901234');

-- Catégories de cours
INSERT INTO course_categories (name, description) VALUES
('Yoga', 'Cours de yoga pour tous niveaux'),
('Musculation', 'Cours de musculation en salle'),
('Pilates', 'Exercices de renforcement musculaire'),
('CrossFit', 'Entraînement croisé intensif'),
('Zumba', 'Cours de danse fitness dynamique'),
('Cyclisme', 'Entraînement en vélo d intérieur');

-- Cours
INSERT INTO courses (coach_id, title, description, max_participants, price, start_time, end_time, category_id) VALUES
(1, 'Yoga Matinal', 'Yoga pour bien commencer la journée', 10, 15.00, '2024-01-10 08:00:00', '2024-01-10 09:00:00', 1),
(1, 'Yoga Avancé', 'Cours de yoga pour pratiquants confirmés', 8, 20.00, '2024-01-11 10:00:00', '2024-01-11 11:00:00', 1),
(2, 'Musculation Avancée', 'Entraînement intensif pour avancés', 8, 20.00, '2024-01-12 18:00:00', '2024-01-12 19:30:00', 2),
(2, 'Pilates Débutant', 'Exercices de base pour renforcer le corps', 12, 18.00, '2024-01-13 09:00:00', '2024-01-13 10:00:00', 3),
(2, 'CrossFit Express', 'Entraînement rapide et intense', 10, 25.00, '2024-01-14 17:00:00', '2024-01-14 17:45:00', 4),
(1, 'Zumba Party', 'Danse fitness pour s amuser tout en brûlant des calories', 20, 12.00, '2024-01-15 19:00:00', '2024-01-15 20:00:00', 5),
(2, 'Cyclisme Endurance', 'Entraînement en vélo pour améliorer la condition physique', 15, 22.00, '2024-01-16 07:00:00', '2024-01-16 08:00:00', 6);

-- Réservations
INSERT INTO reservations (course_id, client_id, status) VALUES
(1, 3, 'confirmed'),
(2, 3, 'pending'),
(3, 4, 'confirmed'),
(4, 4, 'confirmed'),
(5, 3, 'pending');

-- Paiements
INSERT INTO payments (reservation_id, amount, payment_method) VALUES
(1, 15.00, 'card'),
(2, 20.00, 'paypal'),
(3, 20.00, 'card'),
(4, 18.00, 'bank_transfer'),
(5, 25.00, 'card');

-- Abonnements
INSERT INTO subscriptions (client_id, plan_name, price, start_date, end_date, status) VALUES
(3, 'Mensuel', 50.00, '2024-01-01', '2024-01-31', 'active'),
(4, 'Annuel', 500.00, '2024-01-01', '2024-12-31', 'active');

-- Avis
INSERT INTO reviews (course_id, client_id, rating, comment) VALUES
(1, 3, 5, 'Super cours de yoga, très relaxant !'),
(3, 4, 4, 'Excellent entraînement, mais un peu trop intense pour débutants.'),
(5, 3, 4, 'Rapide et efficace, parfait pour un emploi du temps chargé.');

-- Notifications
INSERT INTO notifications (user_id, message, is_read) VALUES
(3, 'Votre réservation pour Yoga Matinal a été confirmée', FALSE),
(4, 'Votre paiement pour Pilates Débutant a été reçu', TRUE),
(3, 'Votre réservation pour CrossFit Express est en attente', FALSE);

-- Fichiers joints
INSERT INTO course_attachments (course_id, file_url) VALUES
(1, 'https://example.com/yoga-guide.pdf'),
(3, 'https://example.com/musculation-plan.pdf'),
(4, 'https://example.com/pilates-beginner.pdf');

-- Codes promotionnels
INSERT INTO promo_codes (code, discount_percentage, valid_from, valid_until, usage_limit) VALUES
('NEWYEAR2024', 20, '2024-01-01', '2024-01-15', 100),
('WINTERFIT', 15, '2024-01-10', '2024-02-10', 50);

-- Historique des modifications
INSERT INTO course_history (course_id, change_description) VALUES
(1, 'Changement de l horaire de 07:00 à 08:00'),
(3, 'Ajout d un maximum de participants à 8.'),
(5, 'Réduction du prix de 30.00 à 25.00.');

COMMIT;
