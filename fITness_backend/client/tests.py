from django.test import TestCase

from django.test import TestCase
from django.utils import timezone
from client.models import Appointments, Users, Gyms, Trainings, SubscriptionPlans

class UsersModelTest(TestCase):

    def setUp(self):
        # Create sample data for testing

        self.user = Users.objects.create(
            user_id = 1,
            user_name='testuser',
            email='testuser@example.com',
            password='testpassword',
            access_rights='USR',
            name='Test',
            second_name='Middle',
            surname='User',
            gender='M',
            subscription_plan=None,
            subscription_expiration='2022-01-01',
        )

    def test_user_creation(self):
        # Test creating a user
        self.user.refresh_from_db()  # Aktualizuj obiekt z bazy danych
        self.assertEqual(self.user.user_id, 1)
        self.assertEqual(self.user.user_name, 'testuser')
        self.assertEqual(self.user.email, 'testuser@example.com')
        self.assertEqual(self.user.password, 'testpassword')
        self.assertEqual(self.user.access_rights, 'USR')
        self.assertEqual(self.user.name, 'Test')
        self.assertEqual(self.user.second_name, 'Middle')
        self.assertEqual(self.user.surname, 'User')
        self.assertEqual(self.user.gender, 'M')
        self.assertEqual(
            str(self.user.subscription_expiration),
            '2022-01-01',
            msg='Subscription expiration date mismatch'
        )

class AppointmentsModelTest(TestCase):

    def setUp(self):
        # Create sample data for testing
        self.trainer = Users.objects.create(username='trainer1')
        self.client = Users.objects.create(username='client1')
        self.gym = Gyms.objects.create(name='Gym1')
        self.training = Trainings.objects.create(name='Training1')

    def test_create_appointment(self):
        # Test creating an appointment
        appointment = Appointments.objects.create(
            appointment_id=1,
            planned_start=timezone.now(),
            planned_end=timezone.now() + timezone.timedelta(hours=1),
            comment='Test comment',
            trainer=self.trainer,
            client=self.client,
            gym=self.gym,
            training=self.training,
        )

        # Check if the appointment is created successfully
        self.assertEqual(appointment.appointment_id, 1)
        self.assertEqual(appointment.comment, 'Test comment')
        self.assertEqual(appointment.trainer, self.trainer)
        self.assertEqual(appointment.client, self.client)
        self.assertEqual(appointment.gym, self.gym)
        self.assertEqual(appointment.training, self.training)

    def test_related_names(self):
        # Test the related names for client set
        appointment = Appointments.objects.create(
            appointment_id=2,
            planned_start=timezone.now(),
            planned_end=timezone.now() + timezone.timedelta(hours=1),
            trainer=self.trainer,
            client=self.client,
            gym=self.gym,
        )

        # Check if the related name is set correctly
        self.assertIn(appointment, self.client.appointments_client_set.all())
