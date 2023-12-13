from django.db import models

# Create your models here.
class SubscriptionPlans(models.Model):
    subscription_plan_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    cost = models.IntegerField()
    class Meta:
        db_table = 'Subscription_plans'

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    password = models.CharField(max_length=45)
    access_rights = models.CharField(max_length=3)
    name = models.CharField(max_length=45)
    second_name = models.CharField(max_length=45, null=True, blank=True)
    surname = models.CharField(max_length=45)
    gender = models.CharField(max_length=1, null=True, blank=True)
    subscription_plan = models.ForeignKey(SubscriptionPlans, on_delete=models.CASCADE, null=True, blank=True)
    subscription_expiration = models.DateField(null=True, blank=True)
    class Meta:
        db_table = 'Users'

class Gym(models.Model):
    gym_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    address = models.CharField(max_length=45, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    mens_lockers = models.IntegerField(null=True, blank=True)
    womans_lockers = models.IntegerField(null=True, blank=True)
    manager = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    class Meta:
        db_table = 'Gyms'