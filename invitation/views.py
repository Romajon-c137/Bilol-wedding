from django.shortcuts import render


def basic_invitation(request):
    """
    Render the basic invitation page.
    """
    return render(request, 'basic.html', )


def invitation(request, name):    
    """
    Render the invitation page.
    """    
    mapping = {
        'a': 'а',
        'b': 'б',
        'd': 'д',
        'e': 'е',
        'f': 'ф',
        'g': 'г',
        'h': 'ҳ',
        'i': 'и',
        'j': 'ж',
        'k': 'к',
        'l': 'л',
        'm': 'м',
        'n': 'н',
        'o': 'о',
        'p': 'п',
        'q': 'қ',
        'r': 'р',
        's': 'с',
        't': 'т',
        'u': 'у',
        'v': 'в',
        'x': 'х',
        'y': 'й',
        'z': 'з',
        'sh': 'ш',
        'ch': 'ч',
        'ng': 'нг',
        'ya': 'я',
        'yo': 'ё',
        'yu': 'ю',
        'o‘': 'ў',
        'g‘': 'ғ',
    }
    
    
    for latin, cyrillic in sorted(mapping.items(), key=lambda x: -len(x[0])):
        name = name.replace(latin, cyrillic)
    
    return render(request, 'special.html', {
        'name': name.replace('-', ' ').capitalize(),
    })
