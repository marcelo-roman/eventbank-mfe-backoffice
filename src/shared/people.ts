export function formatCpf(cpf: string): string {
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
}

export function formatPhone(phone: string): string {
  const local = phone.slice(2);
  const split = local.length > 8 ? 5 : 4;
  return `(${phone.slice(0, 2)}) ${local.slice(0, split)}-${local.slice(split)}`;
}

export function ageOn(birthDate: string, today: Date): number {
  const birth = new Date(`${birthDate}T00:00:00`);
  const age = today.getFullYear() - birth.getFullYear();
  const hadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  return hadBirthday ? age : age - 1;
}
