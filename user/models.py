from django.db import models

class User(models.Model):
    name = models.CharField(max_length=48,null=False)
    email = models.CharField(max_length=64,null=False,unique=True)
    password = models.CharField(max_length=128,null=False)

    def __str__(self):
        return '< %s : %s >' %(self.id,self.name)

    class Meta:
        db_table = 'user'