from django.db import models


class Appointments(models.Model):
    appointment_id = models.IntegerField(primary_key=True)
    planned_start = models.DateTimeField()
    planned_end = models.DateTimeField()
    comment = models.CharField(max_length=500, blank=True, null=True)
    trainer = models.ForeignKey('Users', models.DO_NOTHING, db_column='trainer')
    client = models.ForeignKey('Users', models.DO_NOTHING, db_column='client', related_name='appointments_client_set')
    gym = models.ForeignKey('Gyms', models.DO_NOTHING, db_column='gym')
    training = models.ForeignKey('Trainings', models.DO_NOTHING, db_column='training', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Appointments'


class Equipments(models.Model):
    equipment_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=45)
    max_weight = models.IntegerField()
    min_weight = models.IntegerField()
    gym = models.ForeignKey('Gyms', models.DO_NOTHING, db_column='gym', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Equipments'


class Exercises(models.Model):
    exercise_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=45, blank=True, null=True)
    training = models.ForeignKey('Trainings', models.DO_NOTHING, db_column='training', blank=True, null=True)
    equipment = models.ForeignKey(Equipments, models.DO_NOTHING, db_column='equipment', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Exercises'


class Gyms(models.Model):
    gym_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=45)
    address = models.CharField(max_length=45, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    mens_lockers = models.IntegerField(blank=True, null=True)
    womans_lockers = models.IntegerField(blank=True, null=True)
    manager = models.ForeignKey('Users', models.DO_NOTHING, db_column='manager', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Gyms'


class GymsTrainers(models.Model):
    gym = models.OneToOneField(Gyms, models.DO_NOTHING, primary_key=True)  # The composite primary key (gym_id, trainer_id) found, that is not supported. The first column is selected.
    trainer = models.ForeignKey('Users', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Gyms_Trainers'
        unique_together = (('gym', 'trainer'),)


class Payments(models.Model):
    idpayments = models.IntegerField(db_column='idPayments', primary_key=True)  # Field name made lowercase.
    time = models.DateTimeField()
    amount = models.IntegerField()
    user = models.ForeignKey('Users', models.DO_NOTHING, db_column='user')

    class Meta:
        managed = False
        db_table = 'Payments'


class Reps(models.Model):
    rep_id = models.IntegerField(primary_key=True)
    weight = models.IntegerField(blank=True, null=True)
    excecise = models.ForeignKey(Exercises, models.DO_NOTHING, db_column='excecise', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Reps'


class SubscriptionPlans(models.Model):
    subscription_plan_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=20)
    cost = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'Subscription_plans'


class Trainings(models.Model):
    trainings_id = models.IntegerField(primary_key=True)
    start = models.DateTimeField()
    end = models.DateTimeField(blank=True, null=True)
    locker_num = models.IntegerField(blank=True, null=True)
    client = models.ForeignKey('Users', models.DO_NOTHING, db_column='client')

    class Meta:
        managed = False
        db_table = 'Trainings'


class Users(models.Model):
    user_id = models.IntegerField(primary_key=True)
    user_name = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    password = models.CharField(max_length=45)
    access_rights = models.CharField(max_length=3)
    name = models.CharField(max_length=45)
    second_name = models.CharField(max_length=45, blank=True, null=True)
    surname = models.CharField(max_length=45)
    gender = models.CharField(max_length=1, blank=True, null=True)
    subscription_plan = models.ForeignKey(SubscriptionPlans, models.DO_NOTHING, db_column='subscription_plan', blank=True, null=True)
    subscription_expiration = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Users'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'
