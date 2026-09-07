import re

with open("src/data/mockData.ts", "r", encoding="utf-8") as f:
    content = f.read()

# HQ Mashhad (Real Embed URL)
content = content.replace(
    "'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.225574526543!2d59.50566!3d36.3263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE5JzM0LjciTiA1OcKwMzAnMjAuNCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s'",
    "'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12884.288220021612!2d59.521877609204074!3d36.34707172777176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6c91a03fb716cd%3A0xc665e717805177bb!2sMadar%20Square%2C%20Razavi%20Khorasan%20Province%2C%20Mashhad%2C%20Iran!5e0!3m2!1sen!2s!4v1715000000000!5m2!1sen!2s'"
)

# Factory (Empty for fallback)
content = content.replace(
    "'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.125574526543!2d59.45566!3d36.3363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE5JzM0LjciTiA1OcKwMzAnMjAuNCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s'",
    "''"
)

# R&D Gorgan (Real Embed URL)
content = content.replace(
    "'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.868770258107!2d54.436329!3d36.840243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDUwJzI0LjkiTiA1NMKwMjYnMTAuOCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s'",
    "'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.853036423984!2d54.436329!3d36.8406159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f83196e85555555%3A0x833b708603cb172!2sGorgan%20University%20of%20Agricultural%20Sciences%20and%20Natural%20Resources!5e0!3m2!1sen!2s!4v1715000000000!5m2!1sen!2s'"
)

# Branch Tehran (Real Embed URL)
content = content.replace(
    "'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.924843187216!2d51.40871141525946!3d35.75266738017772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e068b55555555%3A0x8e5e6b0f98cd3a21!2sVanak%20Square!5e0!3m2!1sen!2sus!4v1689234567890!5m2!1sen!2sus'",
    "'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.932915830953!2d51.40871141525946!3d35.75247548017772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e068b55555555%3A0x8e5e6b0f98cd3a21!2sVanak%20Square!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus'"
)


with open("src/data/mockData.ts", "w", encoding="utf-8") as f:
    f.write(content)

