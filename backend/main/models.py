from django.db import models

# Create your models here.


HORARIOS = (
      (1, 'manana'),
      (2, 'tarde'),
      (3, 'noche')
)

class Pedido(models.Model):
      """
      Cualquiera puede hacer un pedido
      """
      latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
      longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

      disponible = models.SmallIntegerField(choices=HORARIOS, null=True, blank=True)

      alimentos = models.JSONField(default=list, blank=True)

      created_at = models.DateTimeField(auto_now_add=True)

      class Meta:
            verbose_name = 'Pedido'
            verbose_name_plural = 'Pedidos'
      
      def __str__(self):
            return f"Pedido {self.id} - {self.created_at}"